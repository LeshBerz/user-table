export const fetchUsers = async (page, limit, sortBy, sortOrder) => {
  const skip = (page - 1) * limit;
  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  if (sortBy && sortOrder) {
    url += `&sortBy=${sortBy}&order=${sortOrder}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ресурс не найден (404)');
      } else if (response.status >= 500) {
        throw new Error('Ошибка сервера (500+)');
      } else {
        throw new Error(`HTTP ошибка: ${response.status}`);
      }
    }
    return response.json();
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Ошибка сети: проверьте подключение к интернету');
    }
    throw err;
  }
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
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Пользователи не найдены (404)');
      } else if (response.status >= 500) {
        throw new Error('Ошибка сервера (500+)');
      } else {
        throw new Error(`HTTP ошибка: ${response.status}`);
      }
    }
    let data = await response.json();
    if (filters.age || filters.gender || filters.country || filters.city) {
      data.users = data.users.filter((user) => {
        return (
          (!filters.age || user.age === Number(filters.age)) &&
          (!filters.gender || user.gender === filters.gender) &&
          (!filters.country || user.address.country.toLowerCase().includes(filters.country.toLowerCase())) &&
          (!filters.city || user.address.city.toLowerCase().includes(filters.city.toLowerCase()))
        );
      });
      data.total = data.users.length;
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Ошибка сети: проверьте подключение к интернету');
    }
    throw err;
  }
};