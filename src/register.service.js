const API_URL = 'http://localhost:3001/api';

const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      return await response.json();
    } catch (error) {
      console.error('Eroare la înregistrare:', error);
      throw error;
    }
  };
  
  export default registerUser;