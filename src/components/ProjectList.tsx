import ProjectListCard from './ProjectListCard';
import { IProject } from '../ts/interfaces-and-types'

import './ProjectList.scss'

interface IProjectList {
  projects: IProject[];
}

export default function ProjectList({ projects }: IProjectList) {

  return (<div>
    <h3>Projects:</h3>

    {projects.length === 0 && <p>No Projects To Display</p>}
    <div>
      <ul className="project-list">
        {projects.map((project) => <ProjectListCard project={project} key={project.id} />)}
      </ul>
    </div>
  </div>)
}