import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/users';
import './Filters.css';

function Filters() {
  const [search, setSearch] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = () => {
    usersStore.setFilters({ search, age, gender, country, city });
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Поиск по ФИО"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={handleSearch}
      />
      <input
        type="number"
        placeholder="Возраст"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        onBlur={handleSearch}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)} onBlur={handleSearch}>
        <option value="">Пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      <input
        type="text"
        placeholder="Страна"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        onBlur={handleSearch}
      />
      <input
        type="text"
        placeholder="Город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onBlur={handleSearch}
      />
    </div>
  );
}

export default observer(Filters);