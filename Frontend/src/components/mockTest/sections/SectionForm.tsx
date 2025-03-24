import React, { useState, useEffect } from "react";

interface Section {
    title: string;
    description: string;
    timeLimit: number;
    questions: any[]; // Replace 'any' with a proper type if questions have a defined structure
}

interface SectionFormProps {
    onSave: (section: Section) => void;
    onCancel: () => void;
    initialData?: Section;
}

const SectionForm: React.FC<SectionFormProps> = ({ onSave, onCancel, initialData }) => {
    const [section, setSection] = useState<Section>({
        title: "",
        description: "",
        timeLimit: 30,
        questions: [],
    });

    useEffect(() => {
        if (initialData) {
            setSection(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (section.title && section.description) {
            onSave(section);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-4">
                {initialData ? "Edit Section" : "New Section"}
            </h3>

            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={section.title}
                        onChange={(e) => setSection((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-white text-black"
                        placeholder="Enter section title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={section.description}
                        onChange={(e) => setSection((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md bg-white text-black"
                        rows={2}
                        placeholder="Enter section description"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Limit (minutes)
                    </label>
                    <input
                        type="number"
                        value={section.timeLimit}
                        onChange={(e) => setSection((prev) => ({ ...prev, timeLimit: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-md bg-white text-black"
                        min="1"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 text-black"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {initialData ? "Save Changes" : "Add Section"}
                </button>
            </div>
        </form>
    );
};

export default SectionForm;
