import { useUsersCollection } from '../hooks/useUsersCollection';
import Avatar from './Avatar';

import './OnlineUsersList.scss';


export default function OnlineUsersList() {
  const { usersState, error } = useUsersCollection();

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {
        usersState && usersState.map(user => (
          <div key={user.id} className="user-list-item">
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))
      }
    </div>
  )
}