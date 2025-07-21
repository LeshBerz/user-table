// /src/pages/UsersPage.jsx
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import usersStore from '../stores/users';
import Table from '../components/Table/Table';
import Filters from '../components/Filters/Filters';
import Pagination from '../components/Pagination/Pagination';
import Modal from '../components/Modal/Modal';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle/LanguageToggle';

function UsersPage() {
  const { t } = useTranslation();

  useEffect(() => {
    usersStore.loadUsers();
  }, []);

  return (
    <div className="app">
      <h1>{t('app.title')}</h1>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <Filters />
      <ErrorMessage />
      {usersStore.loading ? (
        <div>{t('loading')}</div>
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