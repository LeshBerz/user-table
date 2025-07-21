import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import uiStore from '../../stores/ui';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = uiStore;

  return (
    <button className={styles.toggleButton} onClick={toggleTheme}>
      {t(`theme.${theme}`)}
    </button>
  );
}

export default observer(ThemeToggle);