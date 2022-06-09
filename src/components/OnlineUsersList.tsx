import { useUsersCollection } from '../hooks/useUsersCollection';
import { useAuthContext } from '../hooks/useAuthContext';

import { IUser } from '../ts/interfaces-and-types';

import Avatar from './Avatar';

import './OnlineUsersList.scss';

const isOnlineSortCallback = (a: IUser, b: IUser) => a.online > b.online ? -1 : a.online < b.online ? 1 : 0;
const nameSortCallback = (a: IUser, b: IUser) => a!.displayName! < b!.displayName! ? -1 : a!.displayName! > b!.displayName! ? 1 : 0;

export default function OnlineUsersList() {
  const { user } = useAuthContext(); // Currently logged-in user
  const { users, error } = useUsersCollection();

  return (
    <div className="user-list-wrapper">
      <div className="user-list-title-wrapper">
        <h2>All Users</h2>
      </div>
      {error && <div className="error">{error}</div>}
      <ul className="user-list">
        {
          user && users && [...users]
            .filter(sysUser => sysUser.displayName !== user.displayName)
            .sort(nameSortCallback) // Alphabetical
            .sort(isOnlineSortCallback) // move online users to top
            .map((sysUser: IUser) => (
              <li key={sysUser.uid} className="user-list-item">
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