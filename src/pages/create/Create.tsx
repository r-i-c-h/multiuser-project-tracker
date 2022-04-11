import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IUser, IProject } from '../../ts/interfaces-and-types';

import './Create.scss'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  // Add milestones?
  const { user } = useAuthContext(); // need for createdBy field
  const [projectName, setProjectName] = useState('');
  const [endDate, setEndDate] = useState<string | Date>('');
  const [createdAt, setCreatedAt] = useState<string | Date>('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('default');
  const [assignedUsers, setAssignedUsers] = useState();

  const handleClick = (e: SyntheticEvent) => {
    console.log("Clicked")
  }
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (category === "default") {
      return null;
    }
    const now = new Date();
    setCreatedAt(now);
    const createdBy = user!.uid;
    const newProject = { projectName, createdAt, createdBy, endDate, details, category };
    console.table(newProject);
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
        <label> <span>Description:</span>
          <textarea
            required
            onChange={e => { setDetails(e.target.value) }}
            value={details}
          />
        </label>
        <label> <span>Set End Date:</span>
          <input
            type="date"
            required
            onChange={e => { setEndDate(e.target.value) }}
            value={String(endDate)}
          />
        </label>
        <label> <span>Project Cateogy:</span>
          {/* ⚠️ W ⚠️ I ⚠️ P ⚠️  */}
          <select defaultValue={category} onChange={handleSelect} required={true}>
            <option value="default" disabled hidden>
              Select Project Category...
            </option>
            <option value='development'>Development</option>
            <option value='design'>Design</option>
            <option value='sales'>Sales</option>
            <option value='marketing'>Marketing</option>
          </select>
        </label>
        <label> <span>Assigned Parties:</span>
          {/* ⚠️ W ⚠️ I ⚠️ P ⚠️  */}
          {/**TODO: SELECT BOX  **/}
        </label>

        <input onClick={handleClick} type="submit" className='btn' />
      </form>

    </div >
  )
}