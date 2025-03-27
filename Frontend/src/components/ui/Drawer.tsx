import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    width?: string; // Add a width prop
}

export const Drawer: React.FC<DrawerProps> = ({
                                                  isOpen,
                                                  onClose,
                                                  title,
                                                  children,
                                                  width = 'max-w-md', // Default width
                                              }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            setShouldRender(true);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    // Wait until animation completes before unmounting
    const handleExitComplete = () => {
        if (!isOpen) {
            setShouldRender(false);
        }
    };

    if (!shouldRender) return null;

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isOpen && (
                <motion.div
                    key="backdrop"
                    className="absolute inset-0 z-10 flex justify-end bg-black bg-opacity-20 overflow-hidden"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    <motion.div
                        key="drawer"
                        className={`w-full ${width} bg-white h-full`} // Use the width prop
                        initial={{x: '100%'}}
                        animate={{x: 0}}
                        exit={{x: '100%'}}
                        transition={{duration: 0.3}}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-black"/>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto text-black" style={{height: 'calc(100vh - 73px)'}}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};