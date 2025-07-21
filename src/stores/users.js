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
  selectedUser = null;
  columnWidths = {
    fullName: 200,
    age: 100,
    gender: 100,
    phone: 150,
    email: 200,
    country: 150,
    city: 150,
  };

  constructor() {
    makeAutoObservable(this);
    const savedWidths = localStorage.getItem('columnWidths');
    if (savedWidths) {
      this.columnWidths = { ...this.columnWidths, ...JSON.parse(savedWidths) };
    }
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
    this.page = 1;
    this.loadUsers();
  }

  setPage(page) {
    this.page = page;
    this.loadUsers();
  }

  openModal = (user) => {
    console.log('Opening modal for user:', user);
    this.selectedUser = user;
  };

  closeModal = () => {
    console.log('Closing modal, setting selectedUser to null');
    this.selectedUser = null;
  };

  setColumnWidth = (column, width) => {
    if (width >= 50) {
      this.columnWidths[column] = width;
      localStorage.setItem('columnWidths', JSON.stringify(this.columnWidths));
    }
  };

  retryLoadUsers = () => {
    this.error = null;
    this.loadUsers();
  };

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
      this.error = err.message || 'Произошла ошибка при загрузке данных';
    } finally {
      this.loading = false;
    }
  }
}

export default new UsersStore();