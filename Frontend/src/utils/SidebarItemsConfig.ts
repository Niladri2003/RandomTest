import {FileText, Inbox, Tags} from 'lucide-react';

// SidebarItemsConfig.ts

const baseSidebarItems = [
    {
        icon: Inbox,
        text: 'Test',
        to: '/dashboard',
        children: [
            { text: 'Explore', to: '/dashboard' },
            {text: 'Create Test', to: '/dashboard/create-test', roles: ['teacher']},
            { text: 'Recent', to: '/explore/recent' },
            { text: 'Popular', to: '/explore/popular' },
        ],
    },
    {
        icon: FileText,
        text: 'Collections',
        to: '/collections',
        children: [
            { text: 'My Collections', to: '/collections/my' },
            { text: 'Shared', to: '/collections/shared' },
            { text: 'Favorites', to: '/collections/favorites', roles: ['teacher'] },
        ],
    },
    {
        icon: Tags,
        text: 'Tags',
        to: '/tags',
    },
];

export const getSidebarItems = (role: 'teacher' | 'student') => {
    return baseSidebarItems.map((item) => {
        const filteredChildren = item.children?.filter(
            (child) => !child.roles || child.roles.includes(role)
        );

        return { ...item, children: filteredChildren };
    });
};

// config/roleConfig.ts

// Base route config structure for both roles
// export const baseSidebarItems = {
//     teacher: {
//         routes: [
//             { path: '/dashboard', component: 'DashboardLayout' },
//             { path: '/dashboard/create-test', component: 'CreateTest' },
//             { path: '/test/:id/edit', component: 'TestEdit' },
//         ],
//         sidebar: [
//             {
//                 icon: Inbox,
//                 text: 'Test',
//                 to: '/dashboard',
//                 children: [
//                     { text: 'Explore', to: '/dashboard' },
//                     { text: 'Create Test', to: '/dashboard/create-test' },
//                 ],
//             },
//             {
//                 icon: FileText,
//                 text: 'Collections',
//                 to: '/collections',
//                 children: [
//                     { text: 'My Collections', to: '/collections/my' },
//                     { text: 'Shared', to: '/collections/shared' },
//                 ],
//             },
//         ],
//     },
//     student: {
//         routes: [
//             { path: '/dashboard', component: 'DashboardLayout' },
//             { path: '/test/:id', component: 'TestView' },
//         ],
//         sidebar: [
//             {
//                 icon: Inbox,
//                 text: 'Test',
//                 to: '/dashboard',
//                 children: [
//                     { text: 'Explore', to: '/dashboard' },
//                     { text: 'Recent', to: '/explore/recent' },
//                     { text: 'Popular', to: '/explore/popular' },
//                 ],
//             },
//             // {
//             //     icon: FileText,
//             //     text: 'Collections',
//             //     to: '/collections',
//             //     children: [
//             //         { text: 'My Collections', to: '/collections/my' },
//             //         { text: 'Shared', to: '/collections/shared' },
//             //     ],
//             // },
//         ],
//     },
// };
