// src/components/Layout/DashboardLayout.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {Sidebar} from '../components/Sidebar/Sidebar.tsx';
import {Header} from '../components/Sidebar/Header.tsx';
import {Outlet} from "react-router-dom";


const DashboardLayout: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const startResizing = useCallback((e: React.MouseEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                const newWidth = e.clientX;
                if (newWidth >= 180 && newWidth <= 480) {
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );
    // Generate title based on current route
    const getTitle = () => {
        const path = location.pathname.split('/');

        console.log(path);
        const section = path[1].charAt(0).toUpperCase() + path[1].slice(1);
        const subsection = path[2] ? ` - ${path[2].charAt(0).toUpperCase() + path[2].slice(1)}` : '';
        console.log(section, subsection);
        return `${section}${subsection}`;
    };
    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <div className="flex h-screen bg-white overflow-y-hidden rounded-lg">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                sidebarWidth={sidebarWidth}
                isResizing={isResizing}
                startResizing={startResizing}
                isProfileMenuOpen={isProfileMenuOpen}
                setIsProfileMenuOpen={setIsProfileMenuOpen}
            />
            <div className="flex-1 flex flex-col overflow-auto">
                <Header title={getTitle()} setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed}/>
                <div className={"flex-1 overflow-auto"}></div>
                <Outlet/>
            </div>
        </div>
    );
};
export default DashboardLayout;