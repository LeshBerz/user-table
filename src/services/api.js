export const fetchUsers = async (page, limit, sortBy, sortOrder) => {
  
  const skip = (page - 1) * limit;
  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  
  if (sortBy && sortOrder) {
    url += `&sortBy=${sortBy}&order=${sortOrder}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};
