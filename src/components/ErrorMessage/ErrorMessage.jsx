import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import usersStore from '../../stores/users';
import styles from './ErrorMessage.module.css';

function ErrorMessage() {
  const { t } = useTranslation();
  const { error, retryCount = 0 } = usersStore;

  if (!error) return null;

  const handleRetry = () => {
    usersStore.retryLoadUsers();
  };

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        {t(`error.${error.includes('404') ? 'notFound' : error.includes('500') ? 'serverError' : error.includes('HTTP') ? 'httpError' : error.includes('сети') ? 'network' : 'generic'}`)}
        {retryCount > 0 && (
          <span> {t('error.retryAttempt', { count: retryCount })}</span>
        )}
      </p>
      {retryCount < 3 ? (
        <button className={styles.retryButton} onClick={handleRetry}>
          {t('error.retry')}
        </button>
      ) : (
        <p>{t('error.retryLimit')}</p>
      )}
    </div>
  );
}

export default observer(ErrorMessage);