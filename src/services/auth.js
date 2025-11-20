import api from './api';

export default {
  async register(userData) {
    try {
      const response = await api.post('/register', {
        name: userData.name,
        username: userData.username,
        password: userData.password,
      });
      
      // Guardar token y usuario
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      // Guardar token y usuario
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Error al hacer logout:', error);
    } finally {
      // Limpiar localStorage siempre
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async getUser() {
    try {
      const response = await api.get('/me');
      return response.data.user;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};