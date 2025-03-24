import React from 'react';
import { Play, Send, Loader2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface Language {
    id: string;
    name: string;
    extension: string;
    defaultTemplate: string;
}

interface EditorHeaderProps {
    onRun: () => void;
    onSubmit: () => void;
    languages: Language[];
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
    isExecuting: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
                                                       onRun,
                                                       onSubmit,
                                                       languages,
                                                       selectedLanguage,
                                                       onLanguageChange,
                                                       isExecuting
                                                   }) => {
    return (
        <div className="flex justify-between items-center bg-gray-800 p-2 text-white">
            <LanguageSelector
                languages={languages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={onLanguageChange}
            />
            <div className="flex gap-2">
                <button
                    onClick={onRun}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
                >
                    {isExecuting ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Executing...
                        </>
                    ) : (
                        <>
                            <Play size={16} />
                            Run
                        </>
                    )}
                </button>
                <button
                    onClick={onSubmit}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
                >
                    <Send size={16} />
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EditorHeader;