import React, { useState } from 'react';
import { Play, Save } from 'lucide-react';
import { Question } from '../types';
import CodeEditor from "../IDE/CodeEditor.tsx";
import {supportedLanguages} from "../../utils/language.tsx";

interface CodeEditorProps {
    question: Question;
    onCodeChange: (questionId: number, code: string) => void;
    onRunCode: (questionId: number, code: string) => void;
}

const CodeEditorLayout: React.FC<CodeEditorProps> = ({
                                                   question,
                                                   onCodeChange,
                                                   onRunCode
                                               }) => {
    const [output, setOutput] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);
    const handleRunCode = () => {
        setOutput('Running code...');

        // In a real application, you would send the code to a backend for execution
        // For demo purposes, we'll just simulate a response
        setTimeout(() => {
            setOutput('Code executed successfully!\n\nOutput:\nHello, world!');
            onRunCode(question.id, question.userCode || '');
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col md:flex-row">
                {/* Question panel */}
                <div className="w-full md:w-1/2 p-4 border-r border-gray-200 overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">Question {question.id}</h2>
                    <div className="prose max-w-none">
                        <p>{question.text}</p>
                    </div>
                </div>

                {/* Code editor panel */}
                <div className="w-full md:w-1/2 flex flex-col">
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

            {/*/!* Output panel *!/*/}
            {/*<div className="h-1/4 bg-black text-white p-4 font-mono text-sm overflow-y-auto">*/}
            {/*    <div className="flex justify-between items-center mb-2">*/}
            {/*        <span className="text-gray-400">Output</span>*/}
            {/*    </div>*/}
            {/*    <pre className="whitespace-pre-wrap">{output}</pre>*/}
            {/*</div>*/}
        </div>
    );
};

export default CodeEditorLayout;