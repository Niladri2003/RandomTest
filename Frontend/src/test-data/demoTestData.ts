import { Question,TestInfo } from '../utils/types';

const testQuestions: Question[] = [
    {
        id: 1,
        text: "What is the capital of France?",
        options: [
            { id: 'a', text: "London" },
            { id: 'b', text: "Berlin" },
            { id: 'c', text: "Paris" },
            { id: 'd', text: "Madrid" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'general'
    },
    {
        id: 2,
        text: "Which of the following is NOT a JavaScript framework?",
        options: [
            { id: 'a', text: "React" },
            { id: 'b', text: "Angular" },
            { id: 'c', text: "Django" },
            { id: 'd', text: "Vue" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'frontend'
    },
    {
        id: 3,
        text: "What does HTML stand for?",
        options: [
            { id: 'a', text: "Hyper Text Markup Language" },
            { id: 'b', text: "High Tech Modern Language" },
            { id: 'c', text: "Hyper Transfer Markup Language" },
            { id: 'd', text: "Home Tool Markup Language" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'frontend'
    },
    {
        id: 4,
        text: "Which of these is a CSS preprocessor?",
        options: [
            { id: 'a', text: "Node.js" },
            { id: 'b', text: "SASS" },
            { id: 'c', text: "TypeScript" },
            { id: 'd', text: "Webpack" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'frontend'
    },
    {
        id: 5,
        text: "Which tag is used to create a hyperlink in HTML?",
        options: [
            { id: 'a', text: "<link>" },
            { id: 'b', text: "<a>" },
            { id: 'c', text: "<href>" },
            { id: 'd', text: "<url>" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'frontend'
    },
    {
        id: 6,
        text: "Which HTTP status code represents 'Not Found'?",
        options: [
            { id: 'a', text: "200" },
            { id: 'b', text: "404" },
            { id: 'c', text: "500" },
            { id: 'd', text: "302" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'backend'
    },
    {
        id: 7,
        text: "Which of the following is a NoSQL database?",
        options: [
            { id: 'a', text: "MySQL" },
            { id: 'b', text: "PostgreSQL" },
            { id: 'c', text: "MongoDB" },
            { id: 'd', text: "Oracle" }
        ],
        selectedOption: null,
        isMarked: false,
        type: 'mcq',
        section: 'backend'
    },
    {
        id: 8,
        text: "Write a function that reverses a string without using the built-in reverse() method.",
        options: [],
        selectedOption: null,
        isMarked: false,
        type: 'coding',
        codeTemplate: "function reverseString(str) {\n  // Your code here\n}\n\n// Example usage\nconsole.log(reverseString('hello'));",
        userCode: "",
        section: 'coding'
    },
    {
        id: 9,
        text: "Write a function that checks if a given string is a palindrome (reads the same backward as forward).",
        options: [],
        selectedOption: null,
        isMarked: false,
        type: 'coding',
        codeTemplate: "function isPalindrome(str) {\n  // Your code here\n}\n\n// Example usage\nconsole.log(isPalindrome('racecar')); // Should return true\nconsole.log(isPalindrome('hello')); // Should return false",
        userCode: "",
        section: 'coding'
    }
];

const testInfo: TestInfo = {
    title: "Full Stack Developer Assessment",
    description: "This test evaluates your knowledge of web development concepts, programming fundamentals, and problem-solving skills.",
    duration: 7200, // 2 hours
    sections: [
        {
            id: 'general',
            title: 'General Knowledge',
            description: 'Basic web development concepts'
        },
        {
            id: 'frontend',
            title: 'Frontend Development',
            description: 'HTML, CSS, and JavaScript questions'
        },
        {
            id: 'backend',
            title: 'Backend Development',
            description: 'Server-side programming questions'
        },
        {
            id: 'coding',
            title: 'Coding Challenges',
            description: 'Practical programming problems'
        }
    ]
};

export {testInfo, testQuestions};



