import { useRef, useState } from 'react';
import QuestionForm from './questions/QuestionForm';
import QuestionList from './questions/QuestionList';
import { FileSpreadsheet, PlusCircle } from 'lucide-react';
import { parseExcelQuestions } from '../../../utils/parseExcelQuestions.tsx';

interface Section {
    id: string;
    title: string;
    questions: Question[];
}

interface Question {
    id: string;
    title: string;
    type: 'coding' | 'mcq';
}

interface AddQuestionsProps {
    data: { sections: Section[] };
    onUpdate: (data: { sections: Section[] }) => void;
    onNext: () => void;
    onBack: () => void;
}

const AddQuestions: React.FC<AddQuestionsProps> = ({ data, onUpdate, onNext, onBack }) => {
    const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
    const [selectedSection, setSelectedSection] = useState<number>(0);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isExcelProcessing, setIsExcelProcessing] = useState<boolean>(false);
    const [excelError, setExcelError] = useState<string | null>(null);

    const handleAddQuestion = (question: Question) => {
        console.log("ADdddingggg");
        const updatedSections = data.sections.map((section, index) => {
            if (index === selectedSection) {
                return {
                    ...section,
                    questions: [...section.questions, { ...question, id: Date.now().toString() }]
                };
            }
            return section;
        });

        onUpdate({ sections: updatedSections });
        setIsAddingQuestion(false);
    };

    const handleEditQuestion = (question: Question) => {
        console.log("hello editing");
        console.log("Djjj",editingQuestion)
        const updatedSections = data.sections.map((section, index) => {
            if (index === selectedSection) {
                return {
                    ...section,
                    questions: section.questions.map((q) => (q.id === question.id ? question : q))
                };
            }
            return section;
        });

        onUpdate({ sections: updatedSections });
        setEditingQuestion(null);
        setIsAddingQuestion(false);
    };

    const handleSaveDraft = async (question: Question) => {
        console.log('Saving draft:', question);
    };

    const canProceed = data.sections.every((section) => section.questions.length > 0);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsExcelProcessing(true);
        try {
            console.log("working on excel")

            console.log(isExcelProcessing)
            setExcelError(null); // Clear previous error
            const questions = await parseExcelQuestions(file);
            const updatedSections = data.sections.map((section, index) => {
                if (index === selectedSection) {
                    return {
                        ...section,
                        questions: [...section.questions, ...questions.map(q => ({ ...q, id: Date.now()+Math.random().toString() }))]
                    };
                }
                return section;
            });

            onUpdate({ sections: updatedSections });
            // **Reset file input field**
            e.target.value = "";
            setIsExcelProcessing(false);
        } catch (error) {
            setExcelError(error.message || "Failed to process the Excel file. Please check the format.");
            console.error('Error parsing Excel file:', error);
            e.target.value = "";
        }finally {
            e.target.value = "";
            setIsExcelProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Section
                </label>
                <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    {data.sections.map((section, index) => (
                        <option key={section.id} value={index}>
                            {section.title}
                        </option>
                    ))}
                </select>
            </div>

            {!isAddingQuestion && !editingQuestion ? (
                <div className="space-y-4">
                    <QuestionList
                        questions={data.sections[selectedSection].questions}
                        onDelete={(id) => {
                            const updatedSections = data.sections.map((section, index) => {
                                if (index === selectedSection) {
                                    return {
                                        ...section,
                                        questions: section.questions.filter((q) => q.id !== id)
                                    };
                                }
                                return section;
                            });
                            onUpdate({ sections: updatedSections });
                        }}
                        onEdit={(question) => {
                            setEditingQuestion(question);
                            setIsAddingQuestion(false); // Reset before opening
                            setTimeout(() => setIsAddingQuestion(true), 0); // Delay opening to ensure state updates
                        }}
                    />
                    <button
                        onClick={() => {
                            setEditingQuestion(null); // Reset editing mode
                            setIsAddingQuestion(false); // Ensure proper re-render
                            setTimeout(() => setIsAddingQuestion(true), 0); // Delay to allow state update
                        }}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                        <PlusCircle size={20} />
                        Add Question Manually
                    </button>
                   <div className={"flex flex-row w-[30%] gap-4"}>
                       <button
                           onClick={() => fileInputRef.current?.click()}
                           className="flex-1 flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400"
                           disabled={isExcelProcessing} // Disable button while processing
                       >
                           <FileSpreadsheet size={20} />

                           {isExcelProcessing ? (
                               <>
                                   <svg className="animate-spin h-5 w-5 text-gray-600" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                       <path className="opacity-75" fill="currentColor"
                                             d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 00-8 8h4z"></path>
                                   </svg>
                                   <span> Processing...</span>
                               </>
                           ) : (
                               "Upload Excel File"
                           )}
                       </button>
                       <a
                           href="/mnt/data/sample_questions.xlsx"
                           download="sample_questions.xlsx"
                           className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                       >
                           Download Demo Excel File
                       </a>
                   </div>

                    {
                        excelError && <div className="text-red-500">{excelError}</div>
                    }
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
            ) : (
                <QuestionForm
                    onSubmit={editingQuestion ? handleEditQuestion : handleAddQuestion}
                    onCancel={() => {
                        setEditingQuestion(null);
                        setIsAddingQuestion(false);
                    }}
                    onSaveDraft={handleSaveDraft}
                    initialData={editingQuestion}
                />
            )}

            <div className="flex justify-between pt-6 border-t">
                <button
                    onClick={onBack}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 text-black"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AddQuestions;