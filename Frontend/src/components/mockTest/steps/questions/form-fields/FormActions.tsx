import React from 'react';

interface FormActionsProps {
    onCancel: () => void;
    onSaveDraft?: () => void;
    saving?: boolean;
    disabled?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
                                                     onCancel,
                                                     onSaveDraft,
                                                     saving = false,
                                                     disabled = false
                                                 }) => {
    return (
        <div className="flex justify-end gap-4">
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 text-black"
            >
                Cancel
            </button>
            {onSaveDraft && (
                <button
                    type="button"
                    onClick={onSaveDraft}
                    disabled={saving || disabled}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Draft'}
                </button>
            )}
            <button
                type="submit"
                disabled={disabled}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                Add Question
            </button>
        </div>
    );
};

export default FormActions;