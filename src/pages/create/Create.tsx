import { FormEvent, useState } from 'react';
import { MultiValue } from 'react-select';

import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

import UsersSelector from './UsersSelector';
import CategorySelector from './CategorySelector';

import { IProject, IUser } from '../../ts/interfaces-and-types';

import './Create.scss'

type OptionType = { value: IUser; label: string; } // Writes-Over `react-select` generic default
type TCategory = { value: string; label: string; };

export default function Create() {
  const { user } = useAuthContext(); // (need for createdBy field but hook must be at "top level")
  const createdBy = {
    uid: user!.uid,
    displayName: user!.displayName,
    photoURL: user!.photoURL
  };
  /** NEW PROJECT DETAILS: **/
  // Add milestones?
  const [projectName, setProjectName] = useState('');
  const [dueDate, setDueDate] = useState<string | Date>('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<OptionType>>([]);

  const [formError, setFormError] = useState<null | Error | string>(null)

  const createNewProjectFromState = (): IProject => ({
    projectName,
    details,
    createdBy,
    endDate: timestamp.fromDate(new Date(dueDate)),
    category: selectedCategory!.value,
    comments: [],
    assignedUsers: selectedUsers.map(usr => {
      const { uid, displayName, photoURL } = usr.value;
      return { uid, displayName, photoURL } as IUser
    })
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    //! CHECK FOR category && assignedUsers aren't blank!
    const category = selectedCategory?.value;
    if (!category) {
      setFormError('Please select a Project Category.')
      return
    }
    if (selectedUsers.length < 1) {
      setFormError('Project must be assigned to at least 1 User')
      return
    }
    const project = createNewProjectFromState()
    console.table(project);
    useFirestore('projects')
    return (project);
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create New Project</h2>

      <form onSubmit={handleSubmit}>
        <label> <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => { setProjectName(e.target.value) }}
            value={projectName}
          />
        </label>
        <CategorySelector
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <UsersSelector
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
        <label> <span className="date-picker-label">Target Date:</span>
          <input
            required
            className="date-picker-input"
            type="date"
            min="2022-01-01"
            max="2099-12-31"
            onChange={e => { setDueDate(e.target.value) }}
            value={String(dueDate)}
          />
        </label>
        <label> <span>Description:</span>
          <textarea
            className="text-area-input"
            required
            onChange={e => { setDetails(e.target.value) }}
            value={details}
          />
        </label>

        {formError && <p className="error">{formError}</p>}
        <button className="btn">Add Project</button>
      </form>

    </div>
  )
}