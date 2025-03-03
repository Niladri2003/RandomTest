import React from 'react';
import { TestSection } from '../../utils/types.ts';

interface SectionSelectorProps {
    sections: TestSection[];
    currentSection: string;
    onSectionChange: (sectionId: string) => void;
}

const SectionSelector: React.FC<SectionSelectorProps> = ({
                                                             sections,
                                                             currentSection,
                                                             onSectionChange
                                                         }) => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex overflow-x-auto py-3 space-x-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionChange(section.id)}
                            className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                                currentSection === section.id
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionSelector;