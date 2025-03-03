import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface TestCase {
    input: string;
    expectedOutput: string;
}

interface TestCasesProps {
    testCases: TestCase[];
    onTestCaseAdd: () => void;
    onTestCaseChange: (index: number, field: string, value: string) => void;
    onTestCaseRemove: (index: number) => void;
}

const TestCases: React.FC<TestCasesProps> = ({
                                                 testCases,
                                                 onTestCaseAdd,
                                                 onTestCaseChange,
                                                 onTestCaseRemove
                                             }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Test Cases</label>
                <button
                    type="button"
                    onClick={onTestCaseAdd}
                    className="text-blue-600 hover:text-blue-700"
                >
                    <Plus size={20} />
                </button>
            </div>
            <div className="space-y-4">
                {testCases.map((testCase, index) => (
                    <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={testCase.input}
                                onChange={(e) => onTestCaseChange(index, 'input', e.target.value)}
                                placeholder="Input"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={testCase.expectedOutput}
                                onChange={(e) => onTestCaseChange(index, 'expectedOutput', e.target.value)}
                                placeholder="Expected Output"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => onTestCaseRemove(index)}
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

export default TestCases;