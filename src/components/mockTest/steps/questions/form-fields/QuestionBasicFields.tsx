import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuestionBasicFieldsProps {
    title: string;
    description: string;
    timeLimit?: number;
    explanation: string;
    onChange: (field: string, value: string | number) => void;
}

const QuestionBasicFields: React.FC<QuestionBasicFieldsProps> = ({
                                                                     title,
                                                                     description,
                                                                     timeLimit,
                                                                     explanation,
                                                                     onChange
                                                                 }) => {
    const [editorDescription, setEditorDescription] = useState(description);
    const [editorExplanation, setEditorExplanation] = useState(explanation);

    // Function to handle image upload to the editor (you can extend this to upload images to a server)
    const handleImageUpload = (file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            const quill = (document.querySelector('.ql-editor') as HTMLElement).innerHTML;
            setEditorDescription(`${quill}<img src="${imageUrl}" alt="Uploaded Image" />`);
            onChange('description', `${quill}<img src="${imageUrl}" alt="Uploaded Image" />`);
        };
        reader.readAsDataURL(file);
    };
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
        ],
    };
    // const modules = {
    //     toolbar: [
    //         [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         ['bold', 'italic', 'underline'],
    //         ['link', 'image'], // image button for uploading images
    //         [{ 'align': [] }],
    //         ['clean'] // clear formatting button
    //     ],
    //     handlers: {
    //         image: () => {
    //             const input = document.createElement('input');
    //             input.setAttribute('type', 'file');
    //             input.setAttribute('accept', 'image/*');
    //             input.click();
    //
    //             input.onchange = () => {
    //                 const file = input.files ? input.files[0] : null;
    //                 if (file) {
    //                     handleImageUpload(file); // Call the handleImageUpload function
    //                 }
    //             };
    //         }
    //     }
    // };

    return (
        <div className={"flex flex-col gap-2"}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title of the question</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onChange('title', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                    required
                />
            </div>

           <div className={"flex flex-col gap-8"}>
               <div>
                   <label className="block text-sm font-medium text-gray-700">Description</label>
                   <ReactQuill
                       value={editorDescription}
                       onChange={(content) => {
                           setEditorDescription(content);
                           onChange('description', content);
                       }}
                       modules={modules}
                       className="h-[300px]"

                   />
               </div>
               <div>
                   <label className="block text-sm font-medium text-gray-700 mt-4">Explanation of Ans</label>
                   <ReactQuill
                       value={editorExplanation}
                       onChange={(content) => {
                           setEditorExplanation(content);
                           onChange('explanation', content);
                       }}
                       modules={modules}
                       className="h-[150px]"
                   />
               </div>
           </div>
            <div className="mt-20">
                <label className="block text-sm font-medium text-gray-700 ">Time Limit (minutes) (Optional)</label>
                <input
                    type="number"
                    value={timeLimit !== undefined ? timeLimit : ''} // Show empty if undefined
                    onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        onChange('timeLimit', value);
                    }}
                    min="1"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-black"
                />
            </div>
        </div>


    );
};

export default QuestionBasicFields;
