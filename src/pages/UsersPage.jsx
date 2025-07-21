import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../stores/users';
import Table from '../components/Table/Table';
import Filters from '../components/Filters/Filters';
import Pagination from '../components/Pagination/Pagination';
import Modal from '../components/Modal/Modal';

function UsersPage() {
  useEffect(() => {
    usersStore.loadUsers();
  }, []);

  return (
    <div>
      <Filters />
      {usersStore.error && <div>Ошибка: {usersStore.error}</div>}
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