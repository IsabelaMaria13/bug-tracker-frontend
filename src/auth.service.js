const API_URL = 'http://localhost:3001/api';

const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const logoutUser = () => {
    localStorage.removeItem('token');
  };

export { loginUser, logoutUser};
