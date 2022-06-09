import { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';
import LoadingAnimation from '../../components/LoadingAnimation';
import ProjectFilter from './ProjectFilter';
import ProjectList from './ProjectList';

import { IProject } from '../../ts/interfaces-and-types';

import './Dashboard.scss'

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection<IProject>('projects');
  const [projectsFilter, setProjectsFilter] = useState('none');

  // Checks for persistence of filter value in localStorage.
  useEffect(() => {
    const alreadySetValue = window.localStorage.getItem('filter-value');
    if (alreadySetValue) {
      setProjectsFilter(alreadySetValue);
    }
  }, []);

  const updateFilter = (newFilter: string) => {
    setProjectsFilter('clear-all') // <~~ Clears all cards from view to prevent jumping
    setTimeout(() => { setProjectsFilter(newFilter); }, 0)
    window.localStorage.setItem('filter-value', newFilter); // handles returning from a spe
  }

  const projects = documents ? documents.filter((doc) => {
    switch (projectsFilter) {
      case 'clear-all':
        return false;
      case 'none':
        return true;
      case 'assigned to me':
        let isForMe = false;
        doc.assignedUsers.forEach((person) => {
          if (user!.uid === person.uid) {
            isForMe = true;
          }
        })
        return isForMe;
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        return doc.category === projectsFilter;
      default:
        return true;
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {!documents && !error && <div><LoadingAnimation /></div>}
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={projectsFilter} updateFilter={updateFilter} />}
      {projects && <ProjectList projects={projects} isFiltered={projectsFilter != 'none'} />}
    </div>
  )
}