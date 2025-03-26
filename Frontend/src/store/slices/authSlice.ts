import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import {apiConnector} from "../../services/apiConnector.tsx";
import{authEndpoint} from "../../services/apis.tsx";

const{SIGN_UP_API}=authEndpoint

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
    }
];

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(u => u.email === email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        return user;
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password, confirmPassword, role }: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role: 'teacher' | 'student';
    }) => {
        const response = await apiConnector("POST", SIGN_UP_API, {
            full_name: name,
            email,
            password,
            confirm_password: confirmPassword,
            role
        });
        console.log("Signup response",response)
        const newUser: User = {
            name,
            email,
            role,
            bio: '',
            testsCreated: role === 'teacher' ? 0 : undefined,
            testsCompleted: role === 'student' ? 0 : undefined,
            averageScore: role === 'student' ? 0 : undefined,
            joinedAt: new Date()
        };

        return newUser;
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ userId, updates }: { userId: string; updates: Partial<User> }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        const updatedUser = { ...mockUsers[userIndex], ...updates };
        mockUsers[userIndex] = updatedUser;
        return updatedUser;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            });

        // Signup
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Signup failed';
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Profile update failed';
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;