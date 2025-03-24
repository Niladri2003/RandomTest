import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'teacher',
    profilePicture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Computer Science Professor with 10+ years of experience teaching programming and algorithms.',

    testsCreated: 15,
    joinedAt: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'student',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Computer Science student passionate about web development and AI.',

    testsCompleted: 8,
    averageScore: 85,
    joinedAt: new Date('2023-02-15')
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'student',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Software Engineering student with a focus on mobile development.',
    testsCompleted: 12,
    averageScore: 92,
    joinedAt: new Date('2023-01-20')
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'student',
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
    bio: 'Data Science student interested in machine learning and analytics.',

    testsCompleted: 10,
    averageScore: 88,
    joinedAt: new Date('2023-03-05')
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    role: 'teacher',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    bio: 'Mathematics Professor specializing in algorithms and computational theory.',
    testsCreated: 8,
    joinedAt: new Date('2023-02-10')
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },
  
  signup: async (name: string, email: string, password: string, role: 'teacher' | 'student') => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      role
    };
    
    mockUsers.push(newUser);
    set({ user: newUser, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (userId: string, updates: Partial<User>) => {
    set({ isLoading: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userIndex = mockUsers.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
      const updatedUser = { ...mockUsers[userIndex], ...updates };
      mockUsers[userIndex] = updatedUser;

      set(state => ({
        user: state.user?.id === userId ? updatedUser : state.user,
        isLoading: false
      }));

      return updatedUser;
    } else {
      set({ isLoading: false });
      throw new Error('User not found');
    }
  }
}));