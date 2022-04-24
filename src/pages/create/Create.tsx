import { FormEvent, useState } from 'react';
import { MultiValue } from 'react-select';
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { timestamp } from '../../firebase/config';

import { IProject, IUser } from '../../ts/interfaces-and-types';
import { handleError } from '../../ts/ErrorHandler';

import UsersSelector from './UsersSelector';
import CategorySelector from './CategorySelector';

import './Create.scss'

type OptionType = { value: IUser; label: string; } // Writes-Over `react-select` generic default
type TCategory = { value: string; label: string; };

export default function Create() {
  const { user } = useAuthContext(); // (need for createdBy field but hook must be at "top level")
  const { addDocument, response } = useFirestore('projects');
  const history = useHistory(); // For changing page on add-success

  /** NEW PROJECT DETAILS: **/
  const [projectName, setProjectName] = useState('');
  const [dueDate, setDueDate] = useState<string | Date>('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<OptionType>>([]);

  const [formError, setFormError] = useState<null | Error | string>(null)

  const createNewProjectFromState = (): IProject => ({
    projectName,
    details,
    category: selectedCategory!.value,
    endDate: timestamp.fromDate(new Date(dueDate)),
    comments: [],
    createdBy: {
      uid: user!.uid,
      displayName: user!.displayName,
      photoURL: user!.photoURL
    },
    assignedUsers: selectedUsers.map(usr => {
      const { uid, displayName, photoURL }: Omit<IUser, 'online'> = usr.value;
      return { uid, displayName, photoURL }
    })
  })

  const isFormValid = () => {
    const category = selectedCategory?.value;
    if (!category) {
      setFormError('Please select a Project Category.')
      return false;
    }
    if (selectedUsers.length < 1) {
      setFormError('Project must be assigned to at least 1 User')
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null); // Reset
    const isFormOK = isFormValid();
    if (!isFormOK) { return }

    const project = await createNewProjectFromState()
    try {
      await addDocument(project);
      if (!response.error) {
        history.push('/')// redir to Dashboard
      }
    } catch (error) {
      setFormError(handleError(error)) // Crude, but works...
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create New Project</h2>
      <form onSubmit={handleSubmit}>

        {formError && <p className="error">{formError}</p>}

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
        <UsersSelector
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
        <label> <span>Description:</span>
          <textarea
            className="text-area-input"
            required
            onChange={e => { setDetails(e.target.value) }}
            value={details}
          />
        </label>
        <button className="btn" type='submit'>Add Project</button>
      </form>

    </div>
  )
}