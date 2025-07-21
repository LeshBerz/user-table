import { useTranslation } from 'react-i18next';
import styles from './LanguageToggle.module.css';

function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log('Language changed to:', lng); // Отладка
  };

  return (
    <div className={styles.languageToggle}>
      <button
        className={i18n.language === 'ru' ? styles.active : styles.button}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
      <button
        className={i18n.language === 'en' ? styles.active : styles.button}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageToggle;