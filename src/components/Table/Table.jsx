import './Table.css';

function Table({ users }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Возраст</th>
          <th>Пол</th>
          <th>Телефон</th>
          <th>Email</th>
          <th>Страна</th>
          <th>Город</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
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

export default Table;