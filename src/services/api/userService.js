import mockUsers from '@/services/mockData/users.json';

// Simulate delay for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getCurrentUser() {
    await delay(200);
    // Simulate getting the current user (in real app, this would come from auth)
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