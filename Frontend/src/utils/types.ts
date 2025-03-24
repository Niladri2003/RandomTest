export interface Option {
    id: string;
    text: string;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
    selectedOption: string | null;
    isMarked: boolean;
    type: 'mcq' | 'coding';
    codeTemplate?: string;
    userCode?: string;
    section: string;
}
export interface QuestionDev {
    id: string;
    title: string;
    type: 'coding' | 'mcq';
}

// Contains individual Each section inside a single MockTest
export interface SectionDev {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    questions: QuestionDev[];
}

export interface MockTest{
    id: string;
    title: string;
    description: string;
    duration: number;
    published: boolean;
    sections: SectionDev[];
}
export interface TestSection {
    id: string;
    title: string;
    description: string;
}

export interface TestInfo {
    title: string;
    description: string;
    duration: number; // in seconds
    sections: TestSection[];
}

export interface UserAuth {
    email: string;
    accessCode: string;
    isAuthenticated: boolean;
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
