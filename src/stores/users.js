import { makeAutoObservable } from 'mobx';
import { fetchUsers, searchUsers } from '../services/api';

class UsersStore {
  users = [];
  loading = false;
  error = null;
  sortBy = null;
  sortOrder = null;
  page = 1;
  limit = 10;
  total = 0;
  filters = {
    search: '',
    age: '',
    gender: '',
    country: '',
    city: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSort(field) {
    if (this.sortBy === field) {
      if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc';
      } else if (this.sortOrder === 'desc') {
        this.sortBy = null;
        this.sortOrder = null;
      } else {
        this.sortOrder = 'asc';
      }
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.loadUsers();
  }

  setFilters({ search, age, gender, country, city }) {
    this.filters = { search, age, gender, country, city };
    this.page = 1; // Сбрасываем страницу при изменении фильтров
    this.loadUsers();
  }

  setPage(page) {
    this.page = page;
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    try {
      let data;
      if (this.filters.search || this.filters.age || this.filters.gender || this.filters.country || this.filters.city) {
        data = await searchUsers(this.filters, this.page, this.limit, this.sortBy, this.sortOrder);
      } else {
        data = await fetchUsers(this.page, this.limit, this.sortBy, this.sortOrder);
      }
      this.users = data.users;
      this.total = data.total;
      this.error = null;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}

export default new UsersStore();