import React, { useState, useEffect } from 'react';
import EditorHeader from './EditorHeader';
import MonacoEditor from './MonacoEditor';
import OutputPanel from "./OutputPanel";

interface Language {
    id: string;
    name: string;
    extension: string;
    defaultTemplate: string;
}

interface CodeEditorProps {
    initialCode: string;
    onRun: (code: string) => void;
    languages: Language[];
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
    output: string;
    onSubmit: (code: string) => void;
    isExecuting: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
                                                   initialCode,
                                                   onRun,
                                                   languages,
                                                   selectedLanguage,
                                                   onLanguageChange,
                                                   output,
                                                   onSubmit,
                                                   isExecuting
                                               }) => {
    const [code, setCode] = useState<string>(initialCode);

    useEffect(() => {
        console.log(selectedLanguage.defaultTemplate);
        setCode(selectedLanguage.defaultTemplate);
    }, [initialCode, selectedLanguage]);

    return (
        <div className="flex flex-col h-full">
            <EditorHeader
                onRun={() => onRun(code)}
                onSubmit={() => onSubmit(code)}
                languages={languages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={onLanguageChange}
                isExecuting={isExecuting}
            />
            <div className="flex-1">
                <MonacoEditor
                    code={code}
                    onChange={(value) => setCode(value || '')}
                    language={selectedLanguage}
                />
            </div>
            <OutputPanel output={output} />
        </div>
    );
};

export default CodeEditor;