import { makeAutoObservable } from 'mobx';
import { fetchUsers } from '../services/api';

class UsersStore {
  users = [];
  loading = false;
  error = null;
  sortBy = null;
  sortOrder = null;
  page = 1;
  limit = 10;
  total = 0;

  constructor() {
    makeAutoObservable(this);
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