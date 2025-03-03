import React from 'react';
import {Flag} from 'lucide-react';
import {Question} from '../../utils/types.ts';

interface QuestionViewProps {
    question: Question;
    onOptionSelect: (questionId: number, optionId: string) => void;
    onMarkQuestion: (questionId: number) => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({
                                                       question,
                                                       onOptionSelect,
                                                       onMarkQuestion
                                                   }) => {
    return (
        <div>
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Question {question.id}</h2>
                <button
                    onClick={() => onMarkQuestion(question.id)}
                    className={`flex items-center px-3 py-1 rounded-md ${
                        question.isMarked
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <Flag size={16} className={question.isMarked ? 'text-orange-500 mr-1' : 'mr-1'}/>
                    {question.isMarked ? 'Marked' : 'Mark for Review'}
                </button>
            </div>

            <div className="mb-6">
                <p className="text-lg">{question.text}</p>
            </div>

            <div className="space-y-3">
                {question.options.map(option => (
                    <div
                        key={option.id}
                        onClick={() => onOptionSelect(question.id, option.id)}
                        className={`
              p-4 border rounded-lg cursor-pointer transition-colors
              ${question.selectedOption === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
            `}
                    >
                        <div className="flex items-center">
                            <div className={`
                w-6 h-6 flex items-center justify-center rounded-full mr-3
                ${question.selectedOption === option.id
                                ? 'bg-blue-500 text-white'
                                : 'border border-gray-400 text-transparent'}
              `}>
                                {option.id.toUpperCase()}
                            </div>
                            <span>{option.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionView;