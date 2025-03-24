import Editor from "@monaco-editor/react";

interface Language {
    id: string;
    name: string;
    extension: string;
    defaultTemplate: string;
}

interface MonacoEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    language: Language;
}

// Map of languages for Monaco Editor
const languageMap: { [key: string]: string } = {
    typescript: 'typescript',
    javascript: 'javascript',
    python: 'python',
    java: 'java'
};

// Get editor language with fallback
const getEditorLanguage = (id: string): string => languageMap[id] || 'plaintext';

// MonacoEditor Component
const MonacoEditor: React.FC<MonacoEditorProps> = ({ code, onChange, language }) => {
    return (
        <Editor
            height="100%"
            defaultLanguage={languageMap[language.id]}
            language={getEditorLanguage(language.id)}
            theme="vs-dark"
            value={code}
            onChange={onChange}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
            }}
        />
    );
};

export default MonacoEditor;