import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { useUsersCollection } from '../../hooks/useUsersCollection';
import { IUser } from '../../ts/interfaces-and-types';

type OptionType = { value: IUser; label: string; } // Writes-Over `react-select` generic default


import './Create.scss'

interface IUserSelector {
  selectedUsers: MultiValue<OptionType>
  setSelectedUsers: (value: MultiValue<OptionType>) => void
}

const convertUsersToCategoriesUtil = (users: IUser[]): OptionType[] => {
  const nameSortCallback = (a: IUser, b: IUser) => a.displayName! < b.displayName! ? -1 : a.displayName! > b.displayName! ? 1 : 0;

  return users.slice()
    .sort(nameSortCallback)
    .map(
      (user: IUser): OptionType => {
        let name = user.displayName ?? 'Unknown User'
        return { value: user, label: name }
      }
    );
}

export default function UsersSelector({ selectedUsers, setSelectedUsers }: IUserSelector) {
  const { users, error } = useUsersCollection();
  const [userSelectOptions, setUserSelectOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    if (users) {
      const optionsArr = convertUsersToCategoriesUtil(users)
      setUserSelectOptions(optionsArr);
    }
  }, [users])

  return (<>
    {error && <p className="error">{error}</p>}
    <label>
      <span>Assigned Parties: </span>
      <Select
        aria-required={true}
        isMulti={true}
        defaultValue={selectedUsers}
        placeholder="Select Users..."
        onChange={(options) => { setSelectedUsers(options) }}
        options={userSelectOptions}
      />
    </label>
  </>)
}