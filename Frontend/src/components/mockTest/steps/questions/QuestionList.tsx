import React from 'react';
import { Edit2,Trash2, Code, ListChecks } from 'lucide-react';

interface Question {
    id: string;
    title: string;
    type: 'coding' | 'mcq';
}

interface QuestionListProps {
    questions: Question[];
    onDelete: (id: string) => void;
    onEdit: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onDelete,onEdit }) => {
    if (questions.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500">
                No questions added yet
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {questions.map((question, index) => (
                <div
                    key={question.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                    <div className="flex items-center gap-3">
                        {question.type === 'coding' ? (
                            <Code className="text-blue-600" size={20} />
                        ) : (
                            <ListChecks className="text-green-600" size={20} />
                        )}
                        <div>
                            <h4 className="font-medium text-black">
                                {index + 1}. {question.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {question.type === 'coding' ? 'Coding Question' : 'Multiple Choice'}
                            </p>
                        </div>
                    </div>
                   <div className={"flex flex-row  gap-2"}> <button
                       onClick={() => onEdit(question)}
                       className="p-1 text-gray-500 hover:text-blue-600"
                   >
                       <Edit2 size={16} />
                   </button>
                       <button
                           onClick={() => onDelete(question.id)}
                           className="text-red-600 hover:text-red-700"
                       >
                           <Trash2 size={18} />
                       </button></div>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;