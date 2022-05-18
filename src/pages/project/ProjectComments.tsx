import { FormEvent, useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { IProjectDetailsWrapper } from '../../ts/interfaces-and-types';

import './ProjectComments.scss'

export default function ProjectComments({ project }: IProjectDetailsWrapper) {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore('projects');
  const [newCommentTxt, setNewCommentTxt] = useState('');

  const handleNewCommentSubmit = async (e: FormEvent) => {
    // Project Comments are in collection('projects').doc(docID).comments array
    // So updateDocument() gets docID and {comments: []}  where comments MUST contain prior comments as well!
    e.preventDefault();
    const newComment = {
      authorName: user!.displayName,
      authorPhotoURL: user!.photoURL,
      content: newCommentTxt,
      createdAt: timestamp.fromDate(new Date()),
      commentID: crypto.randomUUID() ?? Math.random().toString(),
    }
    console.log(newComment);
  }
  return (<div className='project-comments'>
    <h4>Notes:</h4>
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
    {project.comments.map(x => (<p>x</p>))}
  </div>)
}