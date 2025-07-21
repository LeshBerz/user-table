import { makeAutoObservable } from 'mobx';
import { fetchUsers } from '../services/api';

class UsersStore {
  users = [];
  loading = false;
  error = null;
  sortBy = null; // Поле для сортировки (firstName, age, gender, phone)
  sortOrder = null; // Порядок: asc, desc, null (без сортировки)
  page = 1;
  limit = 10;
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setSort(field) {
    if (this.sortBy === field) {
      // Цикл: asc -> desc -> null
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
    this.loadUsers(); // Перезагружаем данные с новыми параметрами
  }

  async loadUsers() {
    this.loading = true;
    try {
      const data = await fetchUsers(this.page, this.limit, this.sortBy, this.sortOrder);
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