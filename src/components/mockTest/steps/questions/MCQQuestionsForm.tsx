import React, { useState, useEffect } from 'react';
import FormActions from "./form-fields/FormActions";
import QuestionBasicFields from "./form-fields/QuestionBasicFields";
import MCQOptions from "./form-fields/MCQOptions";

interface MCQQuestionsFormProps {
    onSubmit: (question: Question) => void;
    onCancel: () => void;
    onSaveDraft: (question: Question) => Promise<void>;
    initialData?: Question | null;
}

interface Question {
    id: string;
    title: string;
    description: string;
    type: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    timeLimit?: number;
}

const MCQQuestionsForm: React.FC<MCQQuestionsFormProps> = ({ onSubmit, onCancel, onSaveDraft, initialData }) => {
    const [question, setQuestion] = useState<Question>({
        id: Date.now().toString(),
        title: '',
        description: '',
        type: 'mcq',
        options: [''],
        correctAnswer: '',
        explanation: '',
        timeLimit: undefined,
    });
    const [saving, setSaving] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (initialData) {
            setQuestion({
                ...initialData,
                description: initialData.description || '',
                explanation: initialData.explanation || '',
                options: initialData.options.length > 0 ? initialData.options : [''],
            });
        } else {
            setQuestion({
                id: Date.now().toString(),
                title: '',
                description: '',
                type: 'mcq',
                options: [''],
                correctAnswer: '',
                explanation: '',
                timeLimit: undefined,
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!question.title) newErrors.title = 'Title is required';
        if (!question.description) newErrors.description = 'Description is required';
        if (!question.options.length) newErrors.options = 'At least one option is required';
        if (!question.correctAnswer) newErrors.correctAnswer = 'Correct answer is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const cleanedQuestion = {
                ...question,
                timeLimit: question.timeLimit !== undefined ? question.timeLimit : undefined,
            };
            onSubmit(cleanedQuestion);
        }
    };

    const handleSaveDraft = async () => {
        if (question.title) {
            setSaving(true);
            try {
                await onSaveDraft(question);
            } finally {
                setSaving(false);
            }
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...question.options];
        updatedOptions[index] = value;
        setQuestion((prev) => ({ ...prev, options: updatedOptions }));
    };

    const handleOptionAdd = () => {
        setQuestion((prev) => ({
            ...prev,
            options: [...prev.options, ''],
        }));
    };

    const handleOptionRemove = (index: number) => {
        const updatedOptions = question.options.filter((_, i) => i !== index);
        setQuestion((prev) => ({ ...prev, options: updatedOptions }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <QuestionBasicFields
                title={question.title || ''}
                description={question.description || ''}
                explanation={question.explanation || ''}
                onChange={(field, value) => setQuestion(prev => ({ ...prev, [field]: value }))}
            />
            {errors.title && <p className="text-red-600">{errors.title}</p>}
            {errors.description && <p className="text-red-600">{errors.description}</p>}
            <MCQOptions
                options={question.options || []}
                correctAnswer={question.correctAnswer || ''}
                onOptionAdd={handleOptionAdd}
                onOptionChange={handleOptionChange}
                onOptionRemove={handleOptionRemove}
                onCorrectAnswerChange={(answer) => setQuestion(prev => ({ ...prev, correctAnswer: answer }))}
            />
            {errors.options && <p className="text-red-600">{errors.options}</p>}
            {errors.correctAnswer && <p className="text-red-600">{errors.correctAnswer}</p>}
            <FormActions
                onCancel={onCancel}
                onSaveDraft={handleSaveDraft}
                saving={saving}

            />
        </form>
    );
};

export default MCQQuestionsForm;