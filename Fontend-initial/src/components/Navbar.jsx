import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary tracking-wider">
          JAMS
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/login">
            <Button variant="text" className="text-sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" className="text-sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
