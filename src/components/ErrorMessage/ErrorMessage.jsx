import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/users';
import styles from './ErrorMessage.module.css';

function ErrorMessage() {
  const { error, retryCount = 0 } = usersStore;

  if (!error) return null;

  const handleRetry = () => {
    usersStore.retryLoadUsers();
  };

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        {error}
        {retryCount > 0 && (
          <span> (Попытка {retryCount} из 3)</span>
        )}
      </p>
      {retryCount < 3 ? (
        <button className={styles.retryButton} onClick={handleRetry}>
          Повторить
        </button>
      ) : (
        <p>Превышено количество попыток. Попробуйте позже.</p>
      )}
    </div>
  );
}

export default observer(ErrorMessage);