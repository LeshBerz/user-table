import { makeAutoObservable } from 'mobx';

class UIStore {
  theme = localStorage.getItem('theme') || 'light';

  constructor() {
    makeAutoObservable(this);
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
    console.log('Theme toggled to:', this.theme); // Отладка
  };
}

export default new UIStore();