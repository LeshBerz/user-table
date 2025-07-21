// /src/pages/UsersPage.jsx
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../stores/users';
import Table from '../components/Table/Table';

function UsersPage() {
  useEffect(() => {
    usersStore.loadUsers();
  }, []);

  return (
    <div>
      {usersStore.error && <div>Ошибка: {usersStore.error}</div>}
      {usersStore.loading ? <div>Загрузка...</div> : <Table users={usersStore.users} />}
    </div>
  );
}

export default observer(UsersPage);