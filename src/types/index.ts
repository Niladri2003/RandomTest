export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

export interface Question {
  id: string;
  type: 'mcq' | 'coding';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  codeTemplate?: string;
  testCases?: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  duration: number; // in minutes
  questions: Question[];
  isPublished: boolean;
  accessCode?: string;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  score: number;
  maxScore: number;
  submittedAt: Date;
  answers: {
    questionId: string;
    answer: string | number;
    isCorrect: boolean;
  }[];
}