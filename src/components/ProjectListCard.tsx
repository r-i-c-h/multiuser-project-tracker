import { Link } from 'react-router-dom';
import { IProject } from '../ts/interfaces-and-types'
import Avatar from './Avatar';

import './ProjectListCard.scss'

export default function ProjectListCard({ project }: { project: IProject }) {

  return (<>
    <li className="card">
      <Link to={`/projects/${project.id}`}>

        <h4>{project.projectName}</h4>

        <p>Due: {project.endDate.toDate().toDateString()}</p>

        <div>
          <ul className="assigned-to">
            {project.assignedUsers.map(user =>
              <li key={user.photoURL}>
                {/* <Avatar src={user.photoURL} name={user.displayName} /> */}
                <Avatar src={user.photoURL} />
              </li>
            )}
          </ul>
        </div>
      </Link>
    </li>
  </>)

}