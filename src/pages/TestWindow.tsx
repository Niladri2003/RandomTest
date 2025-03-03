import  {useState} from 'react';
import {Menu, Maximize, Minimize, ChevronLeft, ChevronRight, Clock, LogOut} from 'lucide-react';
import TestSidebar from '../components/TestWindow/TestSidebar';
import QuestionView from '../components/TestWindow/QuestionView';
import CodeEditor from '../components/IDE/CodeEditor.tsx';
import StartScreen from '../components/TestWindow/StartScreen';
import SectionSelector from '../components/TestWindow/SectionSelector.tsx';
import {Question, TestInfo, UserAuth} from '../utils/types.ts';
import CodeEditorLayout from "../components/TestWindow/CodeEditorLayout.tsx";

function TestWindow() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
    const [userAuth, setUserAuth] = useState<UserAuth>({
        email: '',
        accessCode: '',
        isAuthenticated: false
    });
    const [currentSection, setCurrentSection] = useState('general');

    // Test information
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

    // Sample test questions
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            text: "What is the capital of France?",
            options: [
                {id: 'a', text: "London"},
                {id: 'b', text: "Berlin"},
                {id: 'c', text: "Paris"},
                {id: 'd', text: "Madrid"}
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
                {id: 'a', text: "React"},
                {id: 'b', text: "Angular"},
                {id: 'c', text: "Django"},
                {id: 'd', text: "Vue"}
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
                {id: 'a', text: "Hyper Text Markup Language"},
                {id: 'b', text: "High Tech Modern Language"},
                {id: 'c', text: "Hyper Transfer Markup Language"},
                {id: 'd', text: "Home Tool Markup Language"}
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
                {id: 'a', text: "Node.js"},
                {id: 'b', text: "SASS"},
                {id: 'c', text: "TypeScript"},
                {id: 'd', text: "Webpack"}
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
                {id: 'a', text: "<link>"},
                {id: 'b', text: "<a>"},
                {id: 'c', text: "<href>"},
                {id: 'd', text: "<url>"}
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
                {id: 'a', text: "200"},
                {id: 'b', text: "404"},
                {id: 'c', text: "500"},
                {id: 'd', text: "302"}
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
                {id: 'a', text: "MySQL"},
                {id: 'b', text: "PostgreSQL"},
                {id: 'c', text: "MongoDB"},
                {id: 'd', text: "Oracle"}
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
    ]);

    // Toggle fullscreen
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle option selection
    const handleOptionSelect = (questionId: number, optionId: string) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? {...q, selectedOption: optionId}
                : q
        ));
    };

    // Handle code change
    const handleCodeChange = (questionId: number, code: string) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? {...q, userCode: code}
                : q
        ));
    };

    // Handle run code
    const handleRunCode = (questionId: number, code: string) => {
        console.log(`Running code for question ${questionId}:`, code);
        // In a real app, you would send this to a backend for execution
    };

    // Mark question for review
    const toggleMarkQuestion = (questionId: number) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? {...q, isMarked: !q.isMarked}
                : q
        ));
    };

    // Navigate to next question
    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Navigate to previous question
    const goToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Format time remaining
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle section change
    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);

        // Find the first question in the selected section
        const firstQuestionIndex = questions.findIndex(q => q.section === sectionId);
        if (firstQuestionIndex !== -1) {
            setCurrentQuestionIndex(firstQuestionIndex);
        }
    };

    // Handle authentication
    const handleStart = (auth: UserAuth) => {
        setUserAuth(auth);
        // Start the timer when the test begins
        startTimer();
    };

    // Start timer
    const startTimer = () => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle logout
    const handleLogout = () => {
        setUserAuth({
            email: '',
            accessCode: '',
            isAuthenticated: false
        });
    };

    // If not authenticated, show start screen
    if (!userAuth.isAuthenticated) {
        return <StartScreen testInfo={testInfo} onStart={handleStart}/>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-100 mr-2"
                    >
                        <Menu size={20}/>
                    </button>
                    <h1 className="text-xl font-bold">Online Test Platform</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                        {userAuth.email}
                    </div>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-md">
                        <Clock size={18} className="text-blue-600 mr-2"/>
                        <span className="font-mono text-blue-600 font-semibold">{formatTime(timeRemaining)}</span>
                    </div>
                    <button
                        onClick={toggleFullScreen}
                        className="p-2 rounded-md hover:bg-gray-100"
                        title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullScreen ? <Minimize size={20}/> : <Maximize size={20}/>}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-md hover:bg-gray-100 text-red-500"
                        title="Logout"
                    >
                        <LogOut size={20}/>
                    </button>
                </div>
            </header>

            {/* Section selector */}
            <SectionSelector
                sections={testInfo.sections}
                currentSection={currentSection}
                onSectionChange={handleSectionChange}
            />

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {isSidebarOpen && (
                    <TestSidebar
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        onQuestionSelect={setCurrentQuestionIndex}
                        currentSection={currentSection}
                    />
                )}

                {/* Question area */}
                <main className="flex-1 overflow-auto">
                    {currentQuestion.type === 'mcq' ? (
                        <div className="p-6">
                            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                                <QuestionView
                                    question={currentQuestion}
                                    onOptionSelect={handleOptionSelect}
                                    onMarkQuestion={toggleMarkQuestion}
                                />

                                {/* Navigation buttons */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        onClick={goToPrevQuestion}
                                        disabled={currentQuestionIndex === 0}
                                        className={`flex items-center px-4 py-2 rounded-md ${
                                            currentQuestionIndex === 0
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                    >
                                        <ChevronLeft size={18} className="mr-1"/> Previous
                                    </button>
                                    <button
                                        onClick={goToNextQuestion}
                                        disabled={currentQuestionIndex === questions.length - 1}
                                        className={`flex items-center px-4 py-2 rounded-md ${
                                            currentQuestionIndex === questions.length - 1
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                    >
                                        Next <ChevronRight size={18} className="ml-1"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full">
                            <CodeEditorLayout
                                question={currentQuestion}
                                onCodeChange={handleCodeChange}
                                onRunCode={handleRunCode}
                            />
                        </div>
                    )}
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-white shadow-md p-4 flex justify-between items-center">
                <div>
                    <span
                        className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
                </div>
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Submit Test
                </button>
            </footer>
        </div>
    );
}

export default TestWindow;