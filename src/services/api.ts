import apiHandler from './api-handler.ts';

export const fetchUsers = async () => {
  try {
    const response = await apiHandler.get('/users');

    // Handle the response data
    const users = response.data;
    console.log('Fetched users:', users);
    return users;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUser = async (id: number) => {
  try {
    const response = await apiHandler.get(`/users/${id}`);

    // Handle the response data
    const user = response.data;
    console.log(`Fetched user with ID ${id}:`, user);
    return user;
  } catch (error) {
    // Handle any errors
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};
