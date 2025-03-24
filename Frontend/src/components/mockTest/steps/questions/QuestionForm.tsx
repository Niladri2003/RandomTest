import React, { useState,useEffect } from 'react';
import CodingQuestionForm from './CodingQuestionForm';
import MCQQuestionForm from './MCQQuestionsForm';

interface Question {
    id: string;
    title: string;
    type: 'coding' | 'mcq';
}
interface QuestionFormProps {
    onSubmit: (question: never) => void;
    onSaveDraft: (question: never) => void;
    onCancel: () => void;
    initialData?: Question | null;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, onCancel,onSaveDraft,initialData }) => {
    const [questionType, setQuestionType] = useState<string>('coding');
    useEffect(() => {
        if (initialData) {
            setQuestionType(initialData.type);
        }
    }, [initialData]);
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type
                </label>
                <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    <option value="coding">Coding Question</option>
                    <option value="mcq">Multiple Choice Question</option>
                </select>
            </div>

            {questionType === 'coding' ? (
                <CodingQuestionForm onSubmit={onSubmit} onCancel={onCancel} initialData={initialData} />
            ) : (
                <MCQQuestionForm onSubmit={onSubmit} onCancel={onCancel} initialData={initialData} />
            )}
        </div>
    );
}

export default QuestionForm;