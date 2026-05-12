import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import AirplaneBackground from '../components/AirplaneBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Mock login delay
    setTimeout(() => {
      if (email === 'admin@jams.com' && password === 'admin123') {
        navigate('/');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <AirplaneBackground />
      
      <Card className="w-full max-w-[420px] relative z-10 animate-fade-in" padding="p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary tracking-wider mb-2">JAMS</h1>
          <p className="text-text-secondary text-sm">Login to your account</p>
        </div>

        <ErrorBanner message={error} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary block ml-1">Email</label>
            <Input 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary block ml-1">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-4 rounded-full text-lg mt-4" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <Link to="/" className="text-xs text-text-secondary hover:text-primary transition-colors block">
            Back to home
          </Link>
        </div>

        {/* Demo Credentials */}
        <div className="mt-10 p-4 bg-[#FFFBF0] rounded-lg border border-[#F5E6CC] text-[11px] text-text-secondary leading-relaxed">
          <p>Demo: <span className="font-semibold">admin@jams.com</span> / <span className="font-semibold">admin123</span> (Admin) or any email/password (Passenger)</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
