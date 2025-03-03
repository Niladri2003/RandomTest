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