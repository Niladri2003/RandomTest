import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CreateTest from './pages/CreateTest';
import TestView from './pages/TestView';
import TestEdit from './pages/TestEdit';
import TestWindow from "./pages/TestWindow.tsx";
import RankingPage from "./pages/RankingPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Teacher only route
const TeacherRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role !== 'teacher') {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/test-window" element={<TestWindow/>} />
        <Route path="/test-window-test" element={<TestView/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ranking" element={<RankingPage />} />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/create-test" 
          element={
            <TeacherRoute>
              <CreateTest />
            </TeacherRoute>
          } 
        />
        
        <Route 
          path="/test/:id/edit" 
          element={
            <TeacherRoute>
              <TestEdit />
            </TeacherRoute>
          } 
        />
        
        <Route 
          path="/test/:id" 
          element={
            <ProtectedRoute>
              <TestView />
            </ProtectedRoute>
          } 
        />
          <Route path={"/profile"} element={
              <ProtectedRoute>
                  <ProfilePage/>
              </ProtectedRoute>
          } />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;