import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
    images: string[];
    onImagesChange: (urls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImagesChange }) => {
    const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        try {
            const uploads = await Promise.all(
                // files.map(file => api.uploadImage(file))
            );
            onImagesChange([...images, ...uploads.map(u => u.url)]);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }, [images, onImagesChange]);

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Question Images (Optional)
                </label>
                <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                    <Upload size={20} />
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                    />
                </label>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={url}
                                alt={`Question image ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;