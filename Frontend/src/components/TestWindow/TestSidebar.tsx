import React from 'react';
import {Question} from '../../utils/types.ts';
import {CheckCircle,  Flag, Code} from 'lucide-react';

interface TestSidebarProps {
    questions: Question[];
    currentQuestionIndex: number;
    onQuestionSelect: (index: number) => void;
    currentSection: string;
}

const TestSidebar: React.FC<TestSidebarProps> = ({
                                                     questions=[],
                                                     currentQuestionIndex,
                                                     onQuestionSelect,
                                                     currentSection
                                                 }) => {
    // Filter questions by current section
    console.log(questions);
    const sectionQuestions = questions.filter(q => q.section === currentSection);

    // Count answered and marked questions in current section
    const answeredCount = sectionQuestions.filter(q => q.selectedOption !== null || q.userCode).length;
    const markedCount = sectionQuestions.filter(q => q.isMarked).length;

    return (
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Question Navigator</h2>
                <div className="flex justify-between mt-2 text-sm">
                    <div className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-1"/>
                        <span>{answeredCount} Answered</span>
                    </div>
                    <div className="flex items-center">
                        <Flag size={16} className="text-orange-500 mr-1"/>
                        <span>{markedCount} Marked</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-5 gap-2">
                    {sectionQuestions.map((question, index) => {
                        // Ensure question has id and section before using them
                        if (!question.id || !question.section) return null;

                        const questionIndex = questions.findIndex(q => q.id === question.id);
                        const isAnswered = question.type === 'mcq'
                            ? question.selectedOption !== null
                            : !!question.userCode;

                        return (
                            <button
                                key={question.id}
                                onClick={() => onQuestionSelect(questionIndex)}
                                className={`
                w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium relative
                ${questionIndex === currentQuestionIndex ? 'ring-2 ring-blue-500' : ''}
                ${isAnswered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                ${question.isMarked ? 'border-2 border-orange-400' : ''}
            `}
                            >
                                {index + 1}
                                {question.type === 'coding' && (
                                    <Code size={10} className="absolute top-0.5 right-0.5"/>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-green-100 mr-2"></div>
                    <span className="text-sm">Answered</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-gray-100 mr-2"></div>
                    <span className="text-sm">Not Answered</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className="w-4 h-4 border-2 border-orange-400 mr-2"></div>
                    <span className="text-sm">Marked for Review</span>
                </div>
                <div className="flex items-center">
                    <Code size={12} className="mr-2"/>
                    <span className="text-sm">Coding Question</span>
                </div>
            </div>
        </div>
    );
};

export default TestSidebar;