import axios from 'axios'

const API_URL = 'http://localhost:3001/api';

const loginUser = async (email, password) =>
{
    try{
        const response = await axios.post(`${API_URL}/auth/login`, {identifier: email, password});
        return response.data;
    }
    catch(error){
        console.error('Error during login:', error);
        throw error;
    }
};

export default loginUser