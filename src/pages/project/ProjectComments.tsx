import { FormEvent, useState } from 'react';
import Avatar from '../../components/Avatar';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { IProjectComment, IProjectDetailsWrapper } from '../../ts/interfaces-and-types';

import './ProjectComments.scss'

export default function ProjectComments({ project }: IProjectDetailsWrapper) {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');
  const [newCommentTxt, setNewCommentTxt] = useState('');

  const handleNewCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newComment: IProjectComment = {
      authorName: user!.displayName,
      authorPhotoURL: user!.photoURL,
      content: newCommentTxt,
      createdAt: timestamp.fromDate(new Date()),
      commentID: crypto.randomUUID() ?? Math.random().toString()
    }
    // Project Comments are in collection('projects').doc(docID).comments array
    // So updateDocument() gets docID and {comments: []}  where comments MUST contain prior comments as well!
    // updateDocument(project.id, {comments:[...project.comments, newComment]})
    updateDocument(project!.id!, { comments: [...project.comments, newComment] })
    if (!response.error) {
      setNewCommentTxt('');
    }
  }

  return (<div className='project-comments'>
    <h4>Project Notes:</h4>
    <ul>
      {
        project.comments.slice()
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()) // <~~ reverse chronological order= New-->Old
          .map(x => (<li key={x.commentID}>
            <div className="comment-author">
              <Avatar src={x.authorPhotoURL} />
              <p className="comment-author-name">{x.authorName}</p>
            </div>
            <div className="comment-date">
              {/* <p>{x.createdAt.toString()}</p> */}
            </div>
            <div className="comment-content">
              <p>{x.content}</p>
            </div>
          </li>)
          )
      }
    </ul>
    <form className="new-comment-form" onSubmit={handleNewCommentSubmit}>
      <label>
        <span>Add New Comment:</span>
        <textarea
          id="comment-text"
          required
          onChange={e => setNewCommentTxt(e.target.value)}
          value={newCommentTxt}
        ></textarea>
      </label>
      <button className="btn" type="submit">Add</button>
    </form>

  </div>)
}