import React, { useState } from 'react';
import CodingQuestionForm from './CodingQuestionForm';
import MCQQuestionForm from './MCQQuestionsForm';

interface QuestionFormProps {
    onSubmit: (question: any) => void;
    onSaveDraft: (question: any) => void;
    onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, onCancel,onSaveDraft }) => {
    const [questionType, setQuestionType] = useState<string>('coding');

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
                <CodingQuestionForm onSubmit={onSubmit} onCancel={onCancel} />
            ) : (
                <MCQQuestionForm onSubmit={onSubmit} onCancel={onCancel} />
            )}
        </div>
    );
}

export default QuestionForm;