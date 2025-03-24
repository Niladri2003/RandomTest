import React, { useState } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import SectionForm from "./sections/SectionForm.tsx";
import {SectionDev as Section} from "../../utils/types.ts";

interface CreateSectionProps {
    data: { sections: Section[] };
    onUpdate: (updates: { sections: Section[] }) => void;
    onNext: () => void;
    onBack: () => void;
}

const CreateSection: React.FC<CreateSectionProps> = ({ data, onUpdate, onNext, onBack }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [section, setSection] = useState<Section>({
        id: Date.now().toString(),
        title: "",
        description: "",
        questions: [],
        timeLimit: 0,
    });
    const [editingSection, setEditingSection] = useState<Section | null>(null);

    const handleSaveSection = (updatedSection: Section) => {
        if (editingSection) {
            // Update existing section
            onUpdate({
                sections: data.sections.map((s) =>
                    s.id === editingSection.id ? { ...updatedSection, id: editingSection.id } : s
                ),
            });
        } else {
            // Add new sectionid: Date.now().toString(),sections: [...(data.sections || []), { ...updatedSection, id: Date.now().toString() }],
            onUpdate({
                sections: [...(data.sections || []), { ...updatedSection, id: Date.now().toString() }],
            });
        }
        setIsAdding(false);
        setEditingSection(null);
    };

    const handleDeleteSection = (sectionId: string) => {
        onUpdate({
            sections: data.sections.filter((s) => s.id !== sectionId.toString()),
        });
    };

    const handleEditSection = (section: Section) => {
        setEditingSection(section);
        setIsAdding(true);
    };

    return (
        <div>
            {!isAdding ? (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full p-4 border-2 border-dashed rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Add New Section
                </button>
            ) : (
                <SectionForm
                    onSave={handleSaveSection}
                    onCancel={() => {
                        setIsAdding(false);
                        setEditingSection(null);
                    }}
                    initialData={editingSection}
                />
            )}

            {data.sections?.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4 text-black">Created Sections</h3>
                    <div className="space-y-4">
                        {data.sections.map((section) => (
                            <div key={section.id} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-black">{section.title}</h4>
                                        <p className="text-sm text-gray-600">{section.description}</p>
                                        <p className="text-sm text-gray-500 mt-2">Time Limit: {section.timeLimit} minutes</p>
                                        <p className="text-sm text-gray-500">Questions: {section.questions?.length || 0}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditSection(section)}
                                            className="p-1 text-gray-500 hover:text-blue-600"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSection(section.id.toString())}
                                            className="p-1 text-gray-500 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-6 pt-6 border-t">
                <button onClick={onBack} className="px-4 py-2 border rounded-md hover:bg-gray-50 text-black">
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!data.sections?.length}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Next: Add Questions
                </button>
            </div>
        </div>
    );
};

export default CreateSection;
