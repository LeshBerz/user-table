import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../stores/users';
import Table from '../components/Table/Table';
import Filters from '../components/Filters/Filters';
import Pagination from '../components/Pagination/Pagination';
import Modal from '../components/Modal/Modal';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

function UsersPage() {
  useEffect(() => {
    usersStore.loadUsers();
  }, []);

  return (
    <div className="app">
      <div style={{ marginBottom: '20px' }}>
        <ThemeToggle />
      </div>
      <Filters />
      <ErrorMessage />
      {usersStore.loading ? (
        <div>Загрузка...</div>
      ) : (
        <>
          <Table users={usersStore.users || []} />
          <Pagination />
        </>
      )}
      <Modal />
    </div>
  );
}

export default observer(UsersPage);