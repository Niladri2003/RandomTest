import React, { useState,useEffect } from 'react';
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

const MCQQuestionsForm: React.FC<MCQQuestionsFormProps> = ({ onSubmit, onCancel, onSaveDraft,initialData }) => {
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
    useEffect(() => {

        if (initialData) {
            console.log("DES",initialData.description);
            console.log("DES",initialData.explanation);
            setQuestion({
                ...initialData,
                description: initialData.description || '',
                explanation: initialData.explanation || '',
                options: initialData.options.length > 0 ? initialData.options : [''],
            });
        } else {
            // Reset to a blank question when adding a new one
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

    const handleSubmit = (e: React.FormEvent) => {
        // console.log(question)
        e.preventDefault();
        console.log("Adding Question");
        if (onSubmit && question.title) {

            const cleanedQuestion = {
                ...question,
                timeLimit: question.timeLimit !== undefined ? question.timeLimit : undefined, // Ensure undefined is handled correctly
            };
            onSubmit(cleanedQuestion);
        }

    };

    const handleSaveDraft = async () => {
        if (onSaveDraft && question.title) {
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
            <MCQOptions
                options={question.options || []}
                correctAnswer={question.correctAnswer || ''}
                onOptionAdd={handleOptionAdd}
                onOptionChange={handleOptionChange}
                onOptionRemove={handleOptionRemove}
                onCorrectAnswerChange={(answer) => setQuestion(prev => ({ ...prev, correctAnswer: answer }))}
            />
            <FormActions
                onCancel={onCancel}
                onSaveDraft={handleSaveDraft}
                saving={saving}
                disabled={!question.title || !question.description || !question.options?.length || !question.correctAnswer}
            />
        </form>
    );
};

export default MCQQuestionsForm;