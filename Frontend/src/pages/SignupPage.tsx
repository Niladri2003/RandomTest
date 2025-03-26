import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import { BookOpen } from 'lucide-react';
import {useAppDispatch,useAppSelector} from "../hooks/redux.ts";
import { signup, clearError } from '../store/slices/authSlice';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  //clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect to dashboard if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
        navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {

      const resp=await dispatch(signup({ name, email, password,confirmPassword, role }));
      console.log("Signup",resp);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };
  const GoogleLoginButton=() =>{
    const handleGoogleLogin=()=>{
      window.location.href="http://localhost:3000/api/v1/auth/google";
    };
    return(<button
        onClick={handleGoogleLogin}
        className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center bg-white hover:bg-gray-100"
    >
      <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <div className="flex justify-center">
              <BookOpen className="h-12 w-12 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <Input
                label="Full name"
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Input
                label="Confirm password"
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I am a
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-indigo-600"
                      name="role"
                      value="teacher"
                      checked={role === 'teacher'}
                      onChange={() => setRole('teacher')}
                    />
                    <span className="ml-2">Teacher/Employer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-indigo-600"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={() => setRole('student')}
                    />
                    <span className="ml-2">Student/Employee</span>
                  </label>
                </div>
              </div>
            </div>
            <GoogleLoginButton />
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
            >
              Create account
            </Button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignupPage;