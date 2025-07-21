import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/users';
import './Table.css';

function Table({ users = [] }) {
  const handleSort = (field) => {
    usersStore.setSort(field);
  };

  const getSortIndicator = (field) => {
    if (usersStore.sortBy === field) {
      return usersStore.sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const handleRowClick = (user) => {
    usersStore.openModal(user);
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('firstName')}>
            ФИО {getSortIndicator('firstName')}
          </th>
          <th onClick={() => handleSort('age')}>
            Возраст {getSortIndicator('age')}
          </th>
          <th onClick={() => handleSort('gender')}>
            Пол {getSortIndicator('gender')}
          </th>
          <th onClick={() => handleSort('phone')}>
            Телефон {getSortIndicator('phone')}
          </th>
          <th>Email</th>
          <th>Страна</th>
          <th>Город</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => handleRowClick(user)} className="user-row">
            <td>{`${user.lastName} ${user.firstName} ${user.maidenName}`}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.address?.country}</td>
            <td>{user.address?.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default observer(Table);