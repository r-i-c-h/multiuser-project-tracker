import { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

import Avatar from '../../components/Avatar'

import { IProjectDetailsWrapper } from '../../ts/interfaces-and-types'
import './ProjectDetails.scss'

export default function ProjectDetails({ project }: IProjectDetailsWrapper) {
  const history = useHistory();
  const { deleteDocument } = useFirestore('projects');
  const { user } = useAuthContext();

  const isProjectAuthorLoggedInUser = project.createdBy.uid === user!.uid;
  const dateTxt = project.endDate.toDate().toLocaleDateString();//toDateString();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const projID = project.id ?? '';
    const verifyActionPopup = window.confirm('⚠️⚠️Are you sure you wish to remove this project?⚠️⚠️')
    if (verifyActionPopup) {
      deleteDocument(projID);
      history.push('/')
    }
  }

  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'><span className="project-name-txt">{project.projectName}</span></h2>
        <p>Created By: <span className="project-author-name">{project.createdBy.displayName}</span></p>

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
      </div>
      {isProjectAuthorLoggedInUser && (<button className="btn project-delete-btn" onClick={handleClick}>Remove Project</button>)}

    </div>)

}