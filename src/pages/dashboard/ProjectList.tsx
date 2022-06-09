import ProjectListCard from './ProjectListCard';
import { IProject } from '../../ts/interfaces-and-types';

import './ProjectList.scss'

interface IProjectList {
  projects: IProject[];
  isFiltered: boolean;
}

export default function ProjectList({ projects, isFiltered }: IProjectList) {

  return (<div>
    <h3>Projects {isFiltered && <span className="filter-warning apparate"> - filtered ({projects.length} result{projects.length === 1 ? '' : 's'})</span>} </h3>
    <div>
      <ul className="project-list">
        {projects.map((project) => <ProjectListCard project={project} key={project.id} />)}
      </ul>
    </div>
  </div>)
}