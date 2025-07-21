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
  retryCount = 0;

  constructor() {
    makeAutoObservable(this);
    const savedWidths = localStorage.getItem('columnWidths');
    if (savedWidths) {
      this.columnWidths = { ...this.columnWidths, ...JSON.parse(savedWidths) };
    }
  }

  setSort(field) {
    console.log('setSort called with field:', field);
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
    console.log('New sort state:', { sortBy: this.sortBy, sortOrder: this.sortOrder });
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

  retryLoadUsers = async () => {
    if (this.retryCount < 3) {
      this.retryCount += 1;
      this.error = null;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.loadUsers();
    }
  };

  async loadUsers() {
    this.loading = true;
    try {
      console.log('loadUsers called with:', { page: this.page, limit: this.limit, sortBy: this.sortBy, sortOrder: this.sortOrder });
      let data;
      if (this.filters.search || this.filters.age || this.filters.gender || this.filters.country || this.filters.city) {
        data = await searchUsers(this.filters, this.page, this.limit, this.sortBy, this.sortOrder);
      } else {
        data = await fetchUsers(this.page, this.limit, this.sortBy, this.sortOrder);
      }
      let users = data.users;
      if (this.sortBy === 'lastName' && this.sortOrder) {
        console.log('Applying client-side sorting for fullName');
        users = [...users].sort((a, b) => {
          const aFullName = `${a.lastName} ${a.firstName} ${a.maidenName}`.toLowerCase();
          const bFullName = `${b.lastName} ${b.firstName} ${b.maidenName}`.toLowerCase();
          if (this.sortOrder === 'asc') {
            return aFullName.localeCompare(bFullName);
          }
          return bFullName.localeCompare(aFullName);
        });
      }
      this.users = users;
      this.total = data.total;
      this.error = null;
      this.retryCount = 0;
    } catch (err) {
      this.error = err.message;
      console.error('loadUsers error:', err);
    } finally {
      this.loading = false;
    }
  }
}

export default new UsersStore();