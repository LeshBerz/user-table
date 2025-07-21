// /src/components/Table/Table.jsx
import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/users';
import styles from './Table.module.css';

function Table({ users = [] }) {
  const resizeRef = useRef(null);
  const startXRef = useRef(null);
  const startWidthRef = useRef(null);
  const columnRef = useRef(null);

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

  const handleMouseDown = (e, column) => {
    startXRef.current = e.clientX;
    startWidthRef.current = usersStore.columnWidths[column] || 100;
    columnRef.current = column;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (startXRef.current !== null && startWidthRef.current !== null) {
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(50, startWidthRef.current + delta);
      usersStore.setColumnWidth(columnRef.current, newWidth);
    }
  };

  const handleMouseUp = () => {
    startXRef.current = null;
    startWidthRef.current = null;
    columnRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th style={{ width: `${usersStore.columnWidths.fullName}px` }} onClick={() => handleSort('lastName')}>
            ФИО {getSortIndicator('lastName')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'fullName')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.age}px` }} onClick={() => handleSort('age')}>
            Возраст {getSortIndicator('age')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'age')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.gender}px` }} onClick={() => handleSort('gender')}>
            Пол {getSortIndicator('gender')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'gender')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.phone}px` }} onClick={() => handleSort('phone')}>
            Телефон {getSortIndicator('phone')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'phone')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.email}px` }}>
            Email
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'email')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.country}px` }}>
            Страна
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'country')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.city}px` }}>
            Город
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'city')}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            onClick={() => handleRowClick(user)}
            className={styles.userRow}
          >
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