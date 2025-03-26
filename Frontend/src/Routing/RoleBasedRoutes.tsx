import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { baseSidebarItems as roleConfig } from '../utils/SidebarItemsConfig';
import * as Pages from '../pages';

const RoleBasedRoutes = () => {
    const { isAuthenticated, user } = useAuthStore();
    const role = user?.role ?? 'student'; // Default to 'student'

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }

    const routes = roleConfig[role]?.routes || []; // Get routes based on user role
    console.log('Role:', role);
    console.log('Available Routes:', routes);

    return (
        <Routes>
            {routes.map(({ path, component }) => {
                console.log('Path:', path, 'Component:', component);
                const Component = Pages[component as keyof typeof Pages]; // Resolve component dynamically
                if (!Component) {
                    console.error(`Component ${component} not found in Pages`);
                    return null;
                }
                console.log('Resolved Component:', Component);
                return (
                    <Route key={path} path={path} element={<Component />} />
                );
            })}
        </Routes>
    );
};

export default RoleBasedRoutes;