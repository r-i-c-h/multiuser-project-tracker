import Avatar from '../../components/Avatar'
import { IProject } from '../../ts/interfaces-and-types'
import './ProjectDetails.scss'

interface IProjectDetails {
  info: IProject
}
export default function ProjectDetails({ info }: IProjectDetails) {
  const dateTxt = info.endDate.toDate().toLocaleDateString();//toDateString();

  return (
    <div className='project-summary'>
      <h2 className='page-title'>Project: <span className="project-name-txt">{info.projectName}</span></h2>

      <p className="due-date">
        Due: <span className="due-date-txt">{dateTxt}</span>
      </p>

      <p className="details">
        {info.details}
      </p>

      <h4>Currently assigned to:</h4>
      <div className="assigned-users">
        {
          info.assignedUsers.map(user => {
            return (<div key={user.uid} className="avatar-and-name-container">
              <Avatar src={user.photoURL} />
              <span className='avatar-name'>{user.displayName}</span>
            </div>)
          })
        }
      </div>
    </div >)

}