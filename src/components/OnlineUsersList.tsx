import { useUsersCollection } from '../hooks/useUsersCollection';
import { useAuthContext } from '../hooks/useAuthContext';

import { IUser } from '../ts/interfaces-and-types';

import Avatar from './Avatar';

import './OnlineUsersList.scss';

const isOnlineSortCallback = (a: IUser, b: IUser) => a.online > b.online ? -1 : a.online < b.online ? 1 : 0;
const nameSortCallback = (a: IUser, b: IUser) => a.displayName < b.displayName ? -1 : a.displayName > b.displayName ? 1 : 0;

export default function OnlineUsersList() {
  const { user } = useAuthContext();
  const { usersState, error } = useUsersCollection();

  return (
    <div className="user-list-wrapper">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      <ul className="user-list">
        {
          user && usersState && [...usersState]
            .filter(sysUser => sysUser.displayName !== user.displayName)
            .sort(nameSortCallback) // Alphabetical
            .sort(isOnlineSortCallback) // move online users to top
            .map((sysUser: IUser) => (
              <li key={sysUser.id} className="user-list-item">
                <span className="status-name">
                  {sysUser.displayName}
                </span>
                <Avatar src={sysUser.photoURL} />
                {sysUser.online && <span className="is-online"></span>}
              </li>
            ))
        }
      </ul>
    </div>
  )
}