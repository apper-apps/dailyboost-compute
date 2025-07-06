import mockTeamMembers from '@/services/mockData/teamMembers.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const teamService = {
  async getTeamMembers() {
    await delay(300);
    return [...mockTeamMembers];
  },

  async addTeamMember(email) {
    await delay(400);
    
    // Check if member already exists
    const existingMember = mockTeamMembers.find(member => 
      member.email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingMember) {
      throw new Error('Team member already exists');
    }
    
    // Create new member
    const newMember = {
      Id: Math.max(...mockTeamMembers.map(m => m.Id)) + 1,
      email: email,
      invitedBy: 'current-user-id',
      joinedDate: new Date().toISOString(),
      lastViewedQuote: null
    };
    
    mockTeamMembers.push(newMember);
    return newMember;
  },

  async removeTeamMember(memberId) {
    await delay(200);
    const memberIndex = mockTeamMembers.findIndex(member => member.Id === memberId);
    
    if (memberIndex === -1) {
      throw new Error('Team member not found');
    }
    
    mockTeamMembers.splice(memberIndex, 1);
    return true;
  },

  async updateTeamMember(memberId, updates) {
    await delay(250);
    const memberIndex = mockTeamMembers.findIndex(member => member.Id === memberId);
    
    if (memberIndex === -1) {
      throw new Error('Team member not found');
    }
    
    const updatedMember = { ...mockTeamMembers[memberIndex], ...updates };
    mockTeamMembers[memberIndex] = updatedMember;
    return updatedMember;
  }
};