import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';

interface MCQOptionsProps {
    options: string[];
    correctAnswer: string;
    onOptionAdd: () => void;
    onOptionChange: (index: number, value: string) => void;
    onOptionRemove: (index: number) => void;
    onCorrectAnswerChange: (option: string) => void;
}

const MCQOptions: React.FC<MCQOptionsProps> = ({
                                                   options,
                                                   correctAnswer,
                                                   onOptionAdd,
                                                   onOptionChange,
                                                   onOptionRemove,
                                                   onCorrectAnswerChange
                                               }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Options</label>
                <button
                    type="button"
                    onClick={onOptionAdd}
                    className="text-blue-600 hover:text-blue-700"
                >
                    <Plus size={20} />
                </button>
            </div>
            <div className="space-y-3">
                {options.map((option, index) => (
                    <div key={index} className="flex gap-4 items-center">
                        <button
                            type="button"
                            onClick={() => onCorrectAnswerChange(option)}
                            className={`p-2 rounded-full border ${
                                correctAnswer === option
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <Check size={16} />
                        </button>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => onOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                            required
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => onOptionRemove(index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Minus size={20} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MCQOptions;