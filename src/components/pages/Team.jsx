import { motion } from 'framer-motion';
import TeamManagement from '@/components/organisms/TeamManagement';

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Team Management
            </h1>
            <p className="text-lg text-gray-600">
              Build your team and share daily motivation together
            </p>
          </div>

          {/* Team Management Component */}
          <TeamManagement />
        </motion.div>
      </div>
    </div>
  );
};

export default Team;