import React from "react";

interface TestData {
    title: string;
    description: string;
    price: number;
}

interface TestBasicInfoProps {
    data: TestData;
    onUpdate: (updates: Partial<TestData>) => void;
    onNext: () => void;
}

const TestBasicInfo: React.FC<TestBasicInfoProps> = ({ data, onUpdate, onNext }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Test Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="mt-1 block w-full bg-white text-black rounded-md border border-gray-400 px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={data.description}
                    onChange={(e) => onUpdate({ description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border bg-white text-black border-gray-300 px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Price (INR)</label>
                <input
                    type="number"
                    value={data.price ?? 0}
                    onChange={(e) => onUpdate({ price: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border bg-white text-black border-gray-300 px-3 py-2"
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-black-600"
                >
                    Next Step
                </button>
            </div>
        </form>
    );
};

export default TestBasicInfo;
