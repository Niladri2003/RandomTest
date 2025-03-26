export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  bio: string;
  testsCreated?: number;
  testsCompleted?: number;
  averageScore?: number;
  joinedAt?: Date;
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
  completionTime: number; // in seconds
  answers: {
    questionId: string;
    answer: string | number;
    isCorrect: boolean;
  }[];
}

export interface TestData{
  title: string;
  description: string;
  price: number;
  duration: number;
  sections: {
    id: string;
    title: string;
    description: string;
    questions: {
      id: string;
      title: string;
      type: 'coding' | 'mcq';
    }[];
  }[];
}
export interface Ranking {
  userId: string;
  userName: string;
  profilePicture?: string;
  organization?: string;
  totalScore: number;
  testsCompleted: number;
  averageScore: number;
  rank: number;
}