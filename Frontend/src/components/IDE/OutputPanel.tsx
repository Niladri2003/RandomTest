import React from 'react';
import { Terminal } from 'lucide-react';

interface OutputPanelProps {
    output: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output }) => {
    return (
        <div className="bg-gray-900 text-white flex flex-col h-[200px]">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-t border-gray-700">
                <Terminal size={16} />
                <span className="text-sm font-medium">Output</span>
            </div>
            <div className="flex-1 overflow-auto">
                <pre className="p-4 font-mono text-sm whitespace-pre-wrap break-words">
                    {output || 'No output'}
                </pre>
            </div>
        </div>
    );
};

export default OutputPanel;