import Avatar from '../../components/Avatar'
import { IProjectDetailsWrapper } from '../../ts/interfaces-and-types'
import './ProjectDetails.scss'

export default function ProjectDetails({ project }: IProjectDetailsWrapper) {
  const dateTxt = project.endDate.toDate().toLocaleDateString();//toDateString();

  return (
    <div className='project-summary'>
      <h2 className='page-title'><span className="project-name-txt">{project.projectName}</span></h2>

      <p className="due-date">
        Due: <span className="due-date-txt">{dateTxt}</span>
      </p>

      <p className="details">
        {project.details}
      </p>

      <h4>Currently assigned to:</h4>
      <div className="assigned-users">
        {
          project.assignedUsers.map(user => {
            return (<div key={user.uid} className="avatar-and-name-container">
              <Avatar src={user.photoURL} />
              <span className='avatar-name'>{user.displayName}</span>
            </div>)
          })
        }
      </div>
    </div >)

}