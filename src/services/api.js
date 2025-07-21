export const fetchUsers = async (page, limit, sortBy, sortOrder) => {
  const skip = (page - 1) * limit;
  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  if (sortBy && sortOrder) {
    url += `&sortBy=${sortBy}&order=${sortOrder}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные пользователей');
  }
  return response.json();
};

export const searchUsers = async (filters, page, limit, sortBy, sortOrder) => {
  const skip = (page - 1) * limit;
  let url = `https://dummyjson.com/users/search?limit=${limit}&skip=${skip}`;
  if (filters.search) {
    url += `&q=${encodeURIComponent(filters.search)}`;
  }
  if (sortBy && sortOrder) {
    url += `&sortBy=${sortBy}&order=${sortOrder}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Не удалось выполнить поиск');
  }
  let data = await response.json();
  
  // Клиентская фильтрация для полей, не поддерживаемых API
  if (filters.age || filters.gender || filters.country || filters.city) {
    data.users = data.users.filter((user) => {
      return (
        (!filters.age || user.age === Number(filters.age)) &&
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.country || user.address.country.toLowerCase().includes(filters.country.toLowerCase())) &&
        (!filters.city || user.address.city.toLowerCase().includes(filters.city.toLowerCase()))
      );
    });
    data.total = data.users.length; // Обновляем total для клиентской фильтрации
  }
  
  return data;
};