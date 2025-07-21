import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import usersStore from '../../stores/users';
import styles from './Table.module.css';

function Table({ users = [] }) {
  const { t } = useTranslation();
  const resizeRef = useRef(null);
  const startXRef = useRef(null);
  const startWidthRef = useRef(null);
  const columnRef = useRef(null);

  const handleSort = (field) => {
    console.log('Sorting triggered for field:', field);
    usersStore.setSort(field);
  };

  const getSortIndicator = (field) => {
    if (usersStore.sortBy === field) {
      return usersStore.sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const handleRowClick = (user) => {
    console.log('Row clicked, opening modal for user:', user.id);
    usersStore.openModal(user);
  };

  const handleMouseDown = (e, column) => {
    console.log('Resize started for column:', column);
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
    console.log('Resize ended');
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
            {t('table.fullName')} {getSortIndicator('lastName')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'fullName')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.age}px` }} onClick={() => handleSort('age')}>
            {t('table.age')} {getSortIndicator('age')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'age')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.gender}px` }} onClick={() => handleSort('gender')}>
            {t('table.gender')} {getSortIndicator('gender')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'gender')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.phone}px` }} onClick={() => handleSort('phone')}>
            {t('table.phone')} {getSortIndicator('phone')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'phone')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.email}px` }}>
            {t('table.email')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'email')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.country}px` }}>
            {t('table.country')}
            <span
              className={styles.resizeHandle}
              onMouseDown={(e) => handleMouseDown(e, 'country')}
            />
          </th>
          <th style={{ width: `${usersStore.columnWidths.city}px` }}>
            {t('table.city')}
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