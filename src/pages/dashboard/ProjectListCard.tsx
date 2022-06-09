import { Link } from 'react-router-dom';
import { IProject } from '../../ts/interfaces-and-types';
import Avatar from '../../components/Avatar';

import './ProjectListCard.scss'

export default function ProjectListCard({ project }: { project: IProject }) {

  return (<>
    <li className="card apparate">
      <Link to={`/projects/${project.id}`}>

        <h4>{project.projectName}</h4>

        <p>Due: {project.endDate.toDate().toDateString()}</p>

        <div>
          <ul className="assigned-to">
            {project.assignedUsers.map(user =>
              <li key={user.photoURL}>
                <div className="tooltip">
                  <Avatar src={user.photoURL} />
                  <span className="tooltiptext">{user.displayName}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </Link>
    </li>
  </>)

}