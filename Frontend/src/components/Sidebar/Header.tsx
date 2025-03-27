import React from 'react';
import {PanelRight} from "lucide-react";

interface HeaderProps {
    title: string;
    setIsCollapsed: (value: boolean) => void;
    isCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({title, setIsCollapsed, isCollapsed}) => {
    return (
        <header className="bg-white border-b px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center flex-row justify-start  gap-2">
                <PanelRight onClick={() => setIsCollapsed(!isCollapsed)} className={"text-black cursor-pointer"}/>
                <p className="text-xl font-semibold text-gray-800">{title}</p>
            </div>
        </header>
    );
};