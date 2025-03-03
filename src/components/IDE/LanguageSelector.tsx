import React from 'react';
import { Code2 } from 'lucide-react';

interface Language {
    id: string;
    name: string;
    extension: string;
    defaultTemplate: string;
}

interface LanguageSelectorProps {
    languages: Language[];
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onLanguageChange }) => {
    return (
        <div className="flex items-center gap-2">
            <Code2 size={20} className="text-gray-400" />
            <select
                value={selectedLanguage.id}
                onChange={(e) => {
                    const language = languages.find((l) => l.id === e.target.value);
                    if (language) onLanguageChange(language);
                }}
                className="bg-gray-700 text-white border-none rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            >
                {languages.map((language) => (
                    <option key={language.id} value={language.id}>
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;