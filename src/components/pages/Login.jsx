import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Login successful! Welcome back.');
        navigate('/');
      } else {
        toast.error(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mx-auto w-16 h-16 bg-sunrise-gradient rounded-full flex items-center justify-center mb-4"
            >
              <ApperIcon name="Sunrise" size={32} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your DailyBoost account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="Enter your email"
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  <ApperIcon 
                    name={showPassword ? 'EyeOff' : 'Eye'} 
                    size={20} 
                  />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="large"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={20} className="animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <ApperIcon name="LogIn" size={20} className="mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: admin@example.com / password123
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;