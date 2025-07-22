import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Файлы переводов
const resources = {
  ru: {
    translation: {
      app: {
        title: 'Список пользователей',
      },
      table: {
        fullName: 'ФИО',
        age: 'Возраст',
        gender: 'Пол',
        phone: 'Телефон',
        email: 'Email',
        country: 'Страна',
        city: 'Город',
      },
      filters: {
        search: 'Поиск',
        age: 'Возраст',
        gender: 'Пол',
        country: 'Страна',
        city: 'Город',
        apply: 'Применить',
        male: 'Мужской',
        female: 'Женский',
      },
      modal: {
        close: 'Закрыть',
        avatarMissing: 'Аватар недоступен',
        age: 'Возраст',
        gender: 'Пол',
        male: 'Мужчина',
        female: 'Женщина',
        phone: 'Телефон',
        email: 'Email',
        address: 'Адрес',
        country: 'Страна',
        city: 'Город',
        street: 'Улица',
        postalCode: 'Почтовый индекс',
        height: 'Рост',
        weight: 'Вес',
        notSpecified: 'Не указан',
        cm: 'см',
        kg: 'кг',
      },
      error: {
        generic: 'Произошла ошибка при загрузке данных',
        network: 'Ошибка сети: проверьте подключение к интернету',
        notFound: 'Ресурс не найден (404)',
        serverError: 'Ошибка сервера (500+)',
        httpError: 'HTTP ошибка: {{status}}',
        usersNotFound: 'Пользователи не найдены (404)',
        retry: 'Повторить',
        retryLimit: 'Превышено количество попыток. Попробуйте позже.',
        retryAttempt: 'Попытка {{count}} из 3',
      },
      pagination: {
        previous: 'Предыдущая',
        next: 'Следующая',
        page: 'Страница',
        of: 'из',
      },
      theme: {
        light: 'Светлая тема',
        dark: 'Темная тема',
      },
      loading: 'Загрузка...',
    },
  },
  en: {
    translation: {
      app: {
        title: 'User List',
      },
      table: {
        fullName: 'Full Name',
        age: 'Age',
        gender: 'Gender',
        phone: 'Phone',
        email: 'Email',
        country: 'Country',
        city: 'City',
      },
      filters: {
        search: 'Search',
        age: 'Age',
        gender: 'Gender',
        country: 'Country',
        city: 'City',
        apply: 'Apply',
        male: 'Male',
        female: 'Female',
      },
      modal: {
        close: 'Close',
        avatarMissing: 'Avatar not available',
        age: 'Age',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        country: 'Country',
        city: 'City',
        street: 'Street',
        postalCode: 'Postal Code',
        height: 'Height',
        weight: 'Weight',
        notSpecified: 'Not specified',
        cm: 'cm',
        kg: 'kg',
      },
      error: {
        generic: 'An error occurred while loading data',
        network: 'Network error: check your internet connection',
        notFound: 'Resource not found (404)',
        serverError: 'Server error (500+)',
        httpError: 'HTTP error: {{status}}',
        usersNotFound: 'Users not found (404)',
        retry: 'Retry',
        retryLimit: 'Retry limit exceeded. Try again later.',
        retryAttempt: 'Attempt {{count}} of 3',
      },
      pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
      },
      theme: {
        light: 'Light Theme',
        dark: 'Dark Theme',
      },
      loading: 'Loading...',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
  });

export default i18n;