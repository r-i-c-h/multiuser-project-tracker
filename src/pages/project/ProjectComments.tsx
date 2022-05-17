import { FormEvent, useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
// import { useParams } from 'react-router-dom'
// import { useDocument } from '../../hooks/useDocument';
import LoadingAnimation from '../../components/LoadingAnimation';

import './ProjectComments.scss'

export default function ProjectComments() {
  const { user } = useAuthContext();
  const [newCommentTxt, setNewCommentTxt] = useState('');

  const handleNewCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newComment = {
      authorName: user!.displayName,
      authorPhotoURL: user!.photoURL,
      content: newCommentTxt,
      createdAt: timestamp.fromDate(new Date()),
      commentID: crypto.randomUUID() ?? Math.random(),
    }
    console.log(newComment);

  }
  // Project Comments are in collection('projects').doc(docID).comments which is an []

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
  </div>)
}