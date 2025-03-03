import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { apiConnector } from '../../../services/apiConnector';
import { mockTest } from '../../../services/apis';

const { SAVE_MOCK_TEST_DRAFT_API } = mockTest;

interface ReviewAndPublishProps {
    data: {
        title: string;
        description: string;
        price: number;
        sections: {
            id: string;
            title: string;
            description: string;
            questions: {
                id: string;
                title: string;
                type: 'coding' | 'mcq';
            }[];
        }[];
    };
    onBack: () => void;
    onPublish: () => void;
}

const ReviewAndPublish: React.FC<ReviewAndPublishProps> = ({ data, onBack, onPublish }) => {
    const [publishing, setPublishing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePublish = async () => {
        setPublishing(true);
        setError(null);
        try {
            console.log(data);
            await apiConnector('POST', SAVE_MOCK_TEST_DRAFT_API, data);
            onPublish();
        } catch (err) {
            setError('Failed to publish test. Please try again.');
            console.log(err)
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-lg divide-y">
                {/* Basic Info */}
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <dl className="grid grid-cols-1 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Title</dt>
                            <dd className="mt-1 text-sm text-gray-900">{data.title}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900">{data.description}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                            <dd className="mt-1 text-sm text-gray-900">${data.price}</dd>
                        </div>
                    </dl>
                </div>

                {/* Sections */}
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sections</h3>
                    <div className="space-y-6">
                        {data.sections.map((section, index) => (
                            <div key={section.id} className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">
                                    {index + 1}. {section.title}
                                </h4>
                                <p className="text-sm text-gray-500 mb-4">{section.description}</p>

                                <div className="space-y-3">
                                    <h5 className="text-sm font-medium text-gray-700">Questions:</h5>
                                    {section.questions.map((question, qIndex) => (
                                        <div key={question.id} className="bg-white p-3 rounded border">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-black">
                                                    {qIndex + 1}. {question.title}
                                                </span>
                                                <span className="text-xs px-2 py-1 rounded-full text-black bg-gray-100">
                                                    {question.type === 'mcq' ? 'Multiple Choice' : 'Coding'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center gap-2 text-red-700">
                    <AlertCircle size={20} />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="flex justify-between pt-6 border-t">
                <button
                    onClick={onBack}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 text-black"
                >
                    Back
                </button>
                <button
                    onClick={handlePublish}
                    disabled={publishing}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {publishing ? (
                        <>
                            <span className="animate-spin">⌛</span>
                            Publishing...
                        </>
                    ) : (
                        <>
                            <Check size={20} />
                            Publish Test
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ReviewAndPublish;