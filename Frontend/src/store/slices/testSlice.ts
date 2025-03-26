import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Test } from '../../types';

// Mock tests for demo
const mockTests: Test[] = [
    {
        id: '1',
        title: 'JavaScript Basics',
        description: 'Test your knowledge of JavaScript fundamentals',
        createdBy: '1',
        createdAt: new Date('2023-01-15'),
        duration: 30,
        questions: [
            {
                id: '1',
                type: 'mcq',
                question: 'What is JavaScript?',
                options: [
                    'A programming language',
                    'A markup language',
                    'A styling language',
                    'A database'
                ],
                correctAnswer: 0
            }
        ],
        isPublished: true,
        accessCode: 'JS101'
    }
];

interface TestState {
    tests: Test[];
    currentTest: Test | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: TestState = {
    tests: [],
    currentTest: null,
    isLoading: false,
    error: null
};

export const createTest = createAsyncThunk(
    'test/create',
    async (test: Omit<Test, 'id' | 'createdAt'>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newTest: Test = {
            ...test,
            id: String(mockTests.length + 1),
            createdAt: new Date()
        };

        mockTests.push(newTest);
        return newTest;
    }
);

export const getTests = createAsyncThunk(
    'test/getAll',
    async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockTests;
    }
);

export const getUserTests = createAsyncThunk(
    'test/getUserTests',
    async (userId: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockTests.filter(test => test.createdBy === userId);
    }
);

export const getTestById = createAsyncThunk(
    'test/getById',
    async (id: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const test = mockTests.find(t => t.id === id);
        if (!test) {
            throw new Error('Test not found');
        }

        return test;
    }
);

export const updateTest = createAsyncThunk(
    'test/update',
    async ({ id, updates }: { id: string; updates: Partial<Test> }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const index = mockTests.findIndex(t => t.id === id);
        if (index === -1) {
            throw new Error('Test not found');
        }

        mockTests[index] = { ...mockTests[index], ...updates };
        return mockTests[index];
    }
);

export const deleteTest = createAsyncThunk(
    'test/delete',
    async (id: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const index = mockTests.findIndex(t => t.id === id);
        if (index === -1) {
            throw new Error('Test not found');
        }

        mockTests.splice(index, 1);
        return id;
    }
);

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentTest: (state) => {
            state.currentTest = null;
        }
    },
    extraReducers: (builder) => {
        // Create Test
        builder
            .addCase(createTest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createTest.fulfilled, (state, action: PayloadAction<Test>) => {
                state.isLoading = false;
                state.tests.push(action.payload);
            })
            .addCase(createTest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to create test';
            });

        // Get All Tests
        builder
            .addCase(getTests.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTests.fulfilled, (state, action: PayloadAction<Test[]>) => {
                state.isLoading = false;
                state.tests = action.payload;
            })
            .addCase(getTests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch tests';
            });

        // Get User Tests
        builder
            .addCase(getUserTests.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserTests.fulfilled, (state, action: PayloadAction<Test[]>) => {
                state.isLoading = false;
                state.tests = action.payload;
            })
            .addCase(getUserTests.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch user tests';
            });

        // Get Test by ID
        builder
            .addCase(getTestById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTestById.fulfilled, (state, action: PayloadAction<Test>) => {
                state.isLoading = false;
                state.currentTest = action.payload;
            })
            .addCase(getTestById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch test';
            });

        // Update Test
        builder
            .addCase(updateTest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateTest.fulfilled, (state, action: PayloadAction<Test>) => {
                state.isLoading = false;
                state.currentTest = action.payload;
                const index = state.tests.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tests[index] = action.payload;
                }
            })
            .addCase(updateTest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update test';
            });

        // Delete Test
        builder
            .addCase(deleteTest.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteTest.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.tests = state.tests.filter(t => t.id !== action.payload);
                if (state.currentTest?.id === action.payload) {
                    state.currentTest = null;
                }
            })
            .addCase(deleteTest.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to delete test';
            });
    }
});

export const { clearError, clearCurrentTest } = testSlice.actions;
export default testSlice.reducer;