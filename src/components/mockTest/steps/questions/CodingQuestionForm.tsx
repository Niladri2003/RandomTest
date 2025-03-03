import React, { useState } from 'react';
// import ImageUpload from './ImageUploader';
import FormActions from "./form-fields/FormActions";
import TestCases from "./form-fields/TestCases";
import CodeEditor from "../../../IDE/CodeEditor";
import { supportedLanguages } from "../../../../utils/language.tsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TestCase {
    input: string;
    expectedOutput: string;
}

interface CodingQuestionFormProps {
    onSubmit: (question: Question) => void;
    onCancel: () => void;
    onSaveDraft?: (question: Question) => Promise<void>;
}

interface Question {
    title: string;
    description: string;
    type: string;
    code: string;
    timeLimit: number;
    testCases: TestCase[];
    images: string[];
}

const CodingQuestionForm: React.FC<CodingQuestionFormProps> = ({ onSubmit, onCancel, onSaveDraft }) => {
    const [question, setQuestion] = useState<Question>({
        title: '',
        description: '',
        type: 'coding',
        code: '',
        timeLimit: 30,
        testCases: [{ input: '', expectedOutput: '' }],
        images: []
    });
    const [saving, setSaving] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit && question.title) {
            onSubmit(question);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
        ],
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

    const handleTestCaseAdd = () => {
        setQuestion(prev => ({
            ...prev,
            testCases: [...(prev.testCases || []), { input: '', expectedOutput: '' }]
        }));
    };

    const handleTestCaseChange = (index: number, field: string, value: string) => {
        setQuestion(prev => ({
            ...prev,
            testCases: prev.testCases?.map((tc, i) =>
                i === index ? { ...tc, [field]: value } : tc
            )
        }));
    };

    const handleTestCaseRemove = (index: number) => {
        setQuestion(prev => ({
            ...prev,
            testCases: prev.testCases?.filter((_, i) => i !== index)
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={question.title}
                    onChange={(e) => setQuestion((prev) => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                    required
                />
            </div>

            {/* Description Input with Resizable Editor */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <ReactQuill
                    value={question.description}
                    onChange={(content) => {
                        setQuestion(prev => ({ ...prev, description: content }));
                    }}
                    modules={modules}
                    className="h-[400px]"

                    theme="snow"
                />
            </div>

            {/* Time Limit Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mt-20">Time Limit (minutes)</label>
                <input
                    type="number"
                    value={question.timeLimit}
                    onChange={(e) => setQuestion((prev) => ({ ...prev, timeLimit: Number(e.target.value) }))}
                    min="1"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                    required
                />
            </div>

            {/* Code Template */}
            <div className=" rounded-lg p-4 lg:h-[1000px]">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Code Template</h3>
                <div className="h-full">
                    <CodeEditor
                        initialCode={question.code || ''}
                        onRun={() => { }}
                        onSubmit={() => { }}
                        output=""
                        languages={supportedLanguages}
                        selectedLanguage={selectedLanguage}
                        onLanguageChange={setSelectedLanguage}
                        isExecuting={false}
                    />
                </div>
            </div>

            {/* Test Cases */}
            <TestCases
                testCases={question.testCases || []}
                onTestCaseAdd={handleTestCaseAdd}
                onTestCaseChange={handleTestCaseChange}
                onTestCaseRemove={handleTestCaseRemove}
            />

            {/* Image Upload */}
            {/*<ImageUpload*/}
            {/*    images={question.images}*/}
            {/*    onImagesChange={(urls) => setQuestion((prev) => ({ ...prev, images: urls }))}*/}
            {/*/>*/}

            {/* Action Buttons */}
            <FormActions
                onCancel={onCancel}
                onSaveDraft={handleSaveDraft}
                saving={saving}
                disabled={!question.title || !question.description}
            />
        </form>
    );
};

export default CodingQuestionForm;
