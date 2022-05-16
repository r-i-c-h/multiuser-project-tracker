import Avatar from '../../components/Avatar'
import { IProject } from '../../ts/interfaces-and-types'
import './ProjectDetails.scss'

interface IProjectDetails {
  info: IProject
}
export default function ProjectDetails({ info }: IProjectDetails) {
  const dateTxt = info.endDate.toDate().toLocaleDateString();//toDateString();
  return (<div className='project-details'>
    <h1 className='project-name'>Project: <span className="project-name-txt">{info.projectName}</span></h1>

    <div className="project-summary">
      <div className="due-date">
        <div>Due:</div> <div className="due-date-txt"> {dateTxt}</div>
      </div>

      <p className="project-details">
        {info.details} { }
      </p>

      <h4 className='project-people-title'>Project is currently assigned to:</h4>
      <ul className='project-assigned-users-list'>
        {
          info.assignedUsers.map(user => {
            return (<li key={user.uid} className='project-assigned-user-details'>
              <Avatar src={user.photoURL} /> {user.displayName}
            </li>)
          })
        }
      </ul>
    </div>


  </div>)
}