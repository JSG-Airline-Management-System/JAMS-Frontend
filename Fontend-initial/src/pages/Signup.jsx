import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import AirplaneBackground from '../components/AirplaneBackground';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.contactNumber) {
      return 'Please fill in all fields';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    
    // Mock signup delay
    setTimeout(() => {
      // In a real app, we would call an API here
      console.log('Signup successful:', formData);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <AirplaneBackground />
      
      <Card className="w-full max-w-[420px] relative z-10 animate-fade-in" padding="p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary tracking-wider mb-2">JAMS</h1>
          <p className="text-text-secondary text-sm">Create your account</p>
        </div>

        <ErrorBanner message={error} />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary block ml-1">Full Name</label>
            <Input 
              name="fullName"
              placeholder="John Doe" 
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary block ml-1">Email</label>
            <Input 
              name="email"
              type="email" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary block ml-1">Password</label>
            <Input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary block ml-1">Contact Number</label>
            <Input 
              name="contactNumber"
              placeholder="+1 234 567 8900" 
              value={formData.contactNumber}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-4 rounded-full text-lg mt-6" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
          <Link to="/" className="text-xs text-text-secondary hover:text-primary transition-colors block">
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
