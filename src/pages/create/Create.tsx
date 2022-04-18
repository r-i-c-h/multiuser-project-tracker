import React, { FormEvent, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import UsersSelector from './UsersSelector';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IUser } from '../../ts/interfaces-and-types';

type OptionType = { value: IUser; label: string; } // Writes-Over `react-select` generic default

import './Create.scss'

type TCategory = { value: string; label: string; };
const categoryOptions: TCategory[] = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  // Add milestones?
  const { user } = useAuthContext(); // (need for createdBy field - hook must be at "top level")
  /** NEW PROJECT DETAILS: **/
  const [projectName, setProjectName] = useState('');
  const [endDate, setEndDate] = useState<string | Date>('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<OptionType>>([]);

  const [formError, setFormError] = useState<null | Error | string>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const createdBy = user?.uid;
    const createdAt = new Date();
    const category = selectedCategory?.value;
    const assignedUsers = selectedUsers;
    if (assignedUsers.length === 0) {
      setFormError('Need to assign someone to this project')
    } else {
      const newProject = { projectName, createdAt, createdBy, endDate, assignedUsers, details, category };
      console.table(newProject);
    }
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
        <label> <span className="date-picker-label">Target Date:</span>
          <input
            required
            className="date-picker-input"
            type="date"
            min="2022-01-01"
            max="2099-12-31"
            onChange={e => { setEndDate(e.target.value) }}
            value={String(endDate)}
          />
        </label>
        <label> <span>Project Category:</span>
          <Select
            aria-required={true}
            defaultValue={selectedCategory}
            placeholder="Select Department..."
            onChange={setSelectedCategory}
            options={categoryOptions}
          />
        </label>
        <label> <span>Description:</span>
          <textarea
            required
            onChange={e => { setDetails(e.target.value) }}
            value={details}
          />
        </label>
        <UsersSelector
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
        <button className="btn">Add Project</button>
      </form>

    </div>
  )
}