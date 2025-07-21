import { observer } from 'mobx-react-lite';
import uiStore from '../../stores/ui';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
  const { theme, toggleTheme } = uiStore;

  return (
    <button className={styles.toggleButton} onClick={toggleTheme}>
      {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
    </button>
  );
}

export default observer(ThemeToggle);