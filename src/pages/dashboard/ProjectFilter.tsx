import { useState } from "react";

import { IProject } from "../../ts/interfaces-and-types";

import './ProjectFilter.scss'

interface IProjectList {
  projects: IProject[];
}


export default function ProjectFilter({ projects }: IProjectList) {
  const filtersListArray = ['All', 'Assigned to Me', 'Development', 'Design', 'Sales', 'Marketing'];
  const [currentFilter, setCurrentFilter] = useState('All');

  const handleClick = (x: string) => {
    console.log(x);
    setCurrentFilter(x);
  }

  return (<div className="project-filter">
    <nav>
      <p>Filter by:</p>
      {filtersListArray.map(f => (
        <button
          key={f}
          onClick={() => handleClick(f)}
          className={currentFilter === f ? 'active' : ''}
        >{f}</button>
      ))}
    </nav>
  </div>)
};
