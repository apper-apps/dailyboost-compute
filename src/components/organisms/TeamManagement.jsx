import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import TeamMemberCard from '@/components/molecules/TeamMemberCard';
import AddTeamMemberForm from '@/components/molecules/AddTeamMemberForm';
import Empty from '@/components/ui/Empty';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { useTeamData } from '@/hooks/useTeamData';
import { useUserData } from '@/hooks/useUserData';

const TeamManagement = () => {
  const { subscription } = useUserData();
  const { 
    teamMembers, 
    loading, 
    error, 
    addTeamMember, 
    removeTeamMember, 
    refreshTeamData 
  } = useTeamData();
  
  const [addingMember, setAddingMember] = useState(false);

  const getTeamLimit = () => {
    const limits = {
      free: 0,
      basic: 10,
      pro: 999
    };
    return limits[subscription?.tier] || 0;
  };

  const handleAddMember = async (email) => {
    setAddingMember(true);
    try {
      await addTeamMember(email);
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await removeTeamMember(memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} onRetry={refreshTeamData} />;

  const teamLimit = getTeamLimit();
  const canAddMembers = teamLimit > 0;

  return (
    <div className="space-y-8">
      {/* Add Team Member Form */}
      {canAddMembers && (
        <Card className="p-6">
          <AddTeamMemberForm
            onAddMember={handleAddMember}
            teamCount={teamMembers.length}
            teamLimit={teamLimit}
            isLoading={addingMember}
          />
        </Card>
      )}

      {/* Team Members List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Team Members ({teamMembers.length})
        </h3>
        
        {teamMembers.length === 0 ? (
          <Empty
            title="No team members yet"
            description={
              canAddMembers 
                ? "Start building your team by inviting colleagues to receive daily motivation together."
                : "Upgrade your plan to add team members and share daily inspiration with your colleagues."
            }
            actionText={canAddMembers ? "Add First Member" : "Upgrade Plan"}
            onAction={() => {
              if (canAddMembers) {
                // Scroll to form
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // Navigate to subscription page
                window.location.href = '/subscription';
              }
            }}
          />
        ) : (
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.Id}
                member={member}
                onRemove={handleRemoveMember}
                canRemove={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;