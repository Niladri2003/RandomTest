import { create } from 'zustand';
import { Test, Question } from '../types';

interface TestState {
  tests: Test[];
  userTests: Test[];
  currentTest: Test | null;
  isLoading: boolean;
  createTest: (test: Omit<Test, 'id' | 'createdAt'>) => Promise<Test>;
  getTests: () => Promise<Test[]>;
  getUserTests: (userId: string) => Promise<Test[]>;
  getTestById: (id: string) => Promise<Test | null>;
  updateTest: (id: string, updates: Partial<Test>) => Promise<Test>;
  deleteTest: (id: string) => Promise<void>;
  addQuestion: (testId: string, question: Omit<Question, 'id'>) => Promise<Test>;
  removeQuestion: (testId: string, questionId: string) => Promise<Test>;
  publishTest: (id: string, accessCode: string) => Promise<Test>;
}

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
      },
      {
        id: '2',
        type: 'coding',
        question: 'Write a function that returns the sum of two numbers',
        codeTemplate: 'function sum(a, b) {\n  // Your code here\n}',
        testCases: [
          { input: 'sum(1, 2)', expectedOutput: '3' },
          { input: 'sum(-1, 1)', expectedOutput: '0' }
        ]
      }
    ],
    isPublished: true,
    accessCode: 'JS101'
  }
];

export const useTestStore = create<TestState>((set, get) => ({
  tests: [],
  userTests: [],
  currentTest: null,
  isLoading: false,
  
  createTest: async (test) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTest: Test = {
      ...test,
      id: String(mockTests.length + 1),
      createdAt: new Date(),
    };
    
    mockTests.push(newTest);
    set(state => ({ 
      tests: [...state.tests, newTest],
      isLoading: false 
    }));
    
    return newTest;
  },
  
  getTests: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ tests: mockTests, isLoading: false });
    return mockTests;
  },
  
  getUserTests: async (userId) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userTests = mockTests.filter(test => test.createdBy === userId);
    set({ userTests, isLoading: false });
    
    return userTests;
  },
  
  getTestById: async (id) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const test = mockTests.find(t => t.id === id) || null;
    set({ currentTest: test, isLoading: false });
    
    return test;
  },
  
  updateTest: async (id, updates) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockTests.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTests[index] = { ...mockTests[index], ...updates };
      set({ tests: [...mockTests], isLoading: false });
      return mockTests[index];
    }
    
    set({ isLoading: false });
    throw new Error('Test not found');
  },
  
  deleteTest: async (id) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockTests.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTests.splice(index, 1);
      set(state => ({ 
        tests: state.tests.filter(t => t.id !== id),
        isLoading: false 
      }));
    } else {
      set({ isLoading: false });
      throw new Error('Test not found');
    }
  },
  
  addQuestion: async (testId, question) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockTests.findIndex(t => t.id === testId);
    if (index !== -1) {
      const newQuestion: Question = {
        ...question,
        id: String(mockTests[index].questions.length + 1)
      };
      
      mockTests[index].questions.push(newQuestion);
      set({ tests: [...mockTests], isLoading: false });
      
      return mockTests[index];
    }
    
    set({ isLoading: false });
    throw new Error('Test not found');
  },
  
  removeQuestion: async (testId, questionId) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockTests.findIndex(t => t.id === testId);
    if (index !== -1) {
      mockTests[index].questions = mockTests[index].questions.filter(
        q => q.id !== questionId
      );
      
      set({ tests: [...mockTests], isLoading: false });
      return mockTests[index];
    }
    
    set({ isLoading: false });
    throw new Error('Test not found');
  },
  
  publishTest: async (id, accessCode) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = mockTests.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTests[index].isPublished = true;
      mockTests[index].accessCode = accessCode;
      
      set({ tests: [...mockTests], isLoading: false });
      return mockTests[index];
    }
    
    set({ isLoading: false });
    throw new Error('Test not found');
  }
}));