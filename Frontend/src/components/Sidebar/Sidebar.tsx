import React from 'react';
import {ChevronLeft, ChevronRight, LayoutDashboard} from 'lucide-react';
import {SidebarItem} from './SidebarItem';
import {ProfileMenu} from './ProfileMenu';
import {getSidebarItems} from "../../utils/SidebarItemsConfig.ts"
import {useAuthStore} from "../../store/authStore.ts";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    sidebarWidth: number;
    isResizing: boolean;
    startResizing: (e: React.MouseEvent) => void;
    isProfileMenuOpen: boolean;
    setIsProfileMenuOpen: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    isCollapsed,
                                                    setIsCollapsed,
                                                    sidebarWidth,
                                                    isResizing,
                                                    startResizing,
                                                    isProfileMenuOpen,
                                                    setIsProfileMenuOpen,
                                                }) => {
    const{user}=useAuthStore();
     const sidebarItem=getSidebarItems(user?.role??'student');
    console.log(sidebarItem)
    // const sidebarItem=baseSidebarItems[user?.role??'student']?.sidebar||[];
    return (
        <div
            style={{ width: isCollapsed ? 64 : sidebarWidth }}
            className={`bg-gray-50 h-screen relative flex flex-col shadow-sm border-r-2 ${
                isResizing ? '' : 'transition-all duration-300 ease-in-out'
            }`}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between ">
                {!isCollapsed && (
                    <div className="flex items-center">

                        <LayoutDashboard className={"text-black"}/>
                        <span className="ml-2 font-semibold text-gray-800">Dashboard</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5 text-black"/> :
                        <ChevronLeft className="h-5 w-5 text-black"/>}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1">
                {sidebarItem.map((item) => (
                    <SidebarItem
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        to={item.to}
                        isCollapsed={isCollapsed}
                        children={item.children}
                    />
                ))}
            </nav>

            {/* Resize handle */}
            {!isCollapsed && (
                <div
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-500 hover:w-1"
                    onMouseDown={startResizing}
                />
            )}

            {/* Profile Menu */}
            <ProfileMenu
                isCollapsed={isCollapsed}
                isProfileMenuOpen={isProfileMenuOpen}
                setIsProfileMenuOpen={setIsProfileMenuOpen}
            />
        </div>
    );
};