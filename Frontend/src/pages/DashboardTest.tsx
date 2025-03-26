// src/components/Layout/DashboardLayout.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar.tsx';
import { Header } from '../components/Sidebar/Header.tsx';
import {Outlet} from "react-router-dom";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

 const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
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
                <Header title="Dashboard"/>
                <div className={"flex-1 overflow-auto"}></div>
                <Outlet/>
            </div>
        </div>
    );
};
export default DashboardLayout;