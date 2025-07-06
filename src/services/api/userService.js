import mockUsers from '@/services/mockData/users.json';

// Simulate delay for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async login(email, password) {
    await delay(300);
    
    // Demo credentials
    const validCredentials = [
      { email: 'admin@example.com', password: 'password123' },
      { email: 'user@example.com', password: 'password123' }
    ];
    
    const isValidCredentials = validCredentials.some(
      cred => cred.email === email && cred.password === password
    );
    
    if (!isValidCredentials) {
      throw new Error('Invalid email or password');
    }
    
    // Find user by email or return first user for demo
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      user,
      token
    };
  },

  async logout() {
    await delay(200);
    // In real app, this would invalidate the token on the server
    return true;
  },

  async getCurrentUser() {
    await delay(200);
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // In real app, this would verify the token and return user data
    return mockUsers[0];
  },

  async updateUser(userId, userData) {
    await delay(300);
    const userIndex = mockUsers.findIndex(user => user.Id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...mockUsers[userIndex], ...userData };
    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  async deleteUser(userId) {
    await delay(200);
    const userIndex = mockUsers.findIndex(user => user.Id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
    return true;
  }
};