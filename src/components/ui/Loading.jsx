import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';

const LoadingSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg ${className}`} 
       style={{
         animation: 'shimmer 1.5s infinite linear',
         backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
       }} />
);

const Loading = ({ type = 'default' }) => {
  if (type === 'quote') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card variant="quote" className="p-8">
          <div className="text-center space-y-6">
            <LoadingSkeleton className="w-16 h-16 mx-auto rounded-full" />
            <div className="space-y-4">
              <LoadingSkeleton className="h-8 w-full" />
              <LoadingSkeleton className="h-8 w-5/6 mx-auto" />
              <LoadingSkeleton className="h-8 w-4/6 mx-auto" />
            </div>
            <LoadingSkeleton className="h-6 w-48 mx-auto" />
            <div className="flex justify-center space-x-4">
              <LoadingSkeleton className="h-10 w-24" />
              <LoadingSkeleton className="h-10 w-24" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (type === 'team') {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LoadingSkeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <LoadingSkeleton className="h-4 w-32" />
                  <LoadingSkeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="text-right space-y-2">
                <LoadingSkeleton className="h-3 w-20" />
                <LoadingSkeleton className="h-4 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'history') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <LoadingSkeleton className="h-20 w-full" />
              <LoadingSkeleton className="h-4 w-3/4" />
              <LoadingSkeleton className="h-3 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Default loading
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="quote" className="p-8">
            <div className="text-center space-y-6">
              <LoadingSkeleton className="w-16 h-16 mx-auto rounded-full" />
              <div className="space-y-4">
                <LoadingSkeleton className="h-8 w-full" />
                <LoadingSkeleton className="h-8 w-5/6 mx-auto" />
                <LoadingSkeleton className="h-8 w-4/6 mx-auto" />
              </div>
              <LoadingSkeleton className="h-6 w-48 mx-auto" />
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <LoadingSkeleton className="h-6 w-3/4" />
              <LoadingSkeleton className="h-16 w-full" />
              <LoadingSkeleton className="h-10 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Add shimmer animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
document.head.appendChild(style);

export default Loading;