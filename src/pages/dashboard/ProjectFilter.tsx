import { Dispatch, SetStateAction } from "react";

import { IProject } from "../../ts/interfaces-and-types";

import './ProjectFilter.scss'

interface IProjectFilter {
  currentFilter: string;
  updateFilter: (f: string) => void;
}

const filtersListArray = ['None', 'Assigned to Me', 'Development', 'Design', 'Sales', 'Marketing'];

export default function ProjectFilter({ currentFilter, updateFilter }: IProjectFilter) {

  const handleClick = (x: string) => {
    updateFilter(x.toLowerCase());
  }

  return (<div className="project-filter">
    <nav>
      <p>Filter:</p>
      {filtersListArray.map(f => (
        <button
          key={f}
          onClick={() => handleClick(f)}
          className={currentFilter === f.toLowerCase() ? 'active' : ''}
        >{f}</button>
      ))}
    </nav>
  </div>)
};
