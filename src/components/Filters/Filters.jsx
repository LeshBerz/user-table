import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import usersStore from '../../stores/users';
import styles from './Filters.module.css';

function Filters() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    search: '',
    age: '',
    gender: '',
    country: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    usersStore.setFilters(filters);
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder={t('filters.search')}
      />
      <input
        type="number"
        name="age"
        value={filters.age}
        onChange={handleChange}
        placeholder={t('filters.age')}
      />
      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">{t('filters.gender')}</option>
        <option value="male">{t('filters.male')}</option>
        <option value="female">{t('filters.female')}</option>
      </select>
      <input
        type="text"
        name="country"
        value={filters.country}
        onChange={handleChange}
        placeholder={t('filters.country')}
      />
      <input
        type="text"
        name="city"
        value={filters.city}
        onChange={handleChange}
        placeholder={t('filters.city')}
      />
      <button type="submit">{t('filters.apply')}</button>
    </form>
  );
}

export default observer(Filters);