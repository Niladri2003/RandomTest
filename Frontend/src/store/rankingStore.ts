import { create } from 'zustand';
import { Ranking, TestResult } from '../utils/types.ts';

interface RankingState {
    rankings: Ranking[];
    isLoading: boolean;
    getRankings: () => Promise<Ranking[]>;
    getTopRankings: (limit?: number) => Promise<Ranking[]>;
    getUserRanking: (userId: string) => Promise<Ranking | null>;
}

// Mock test results for demo
const mockTestResults: TestResult[] = [
    {
        id: '1',
        testId: '1',
        userId: '2', // Jane Smith
        score: 85,
        maxScore: 100,
        submittedAt: new Date('2023-03-10'),
        completionTime: 1500, // 25 minutes
        answers: []
    },
    {
        id: '2',
        testId: '1',
        userId: '3', // Michael Johnson
        score: 92,
        maxScore: 100,
        submittedAt: new Date('2023-03-11'),
        completionTime: 1200, // 20 minutes
        answers: []
    },
    {
        id: '3',
        testId: '1',
        userId: '4', // Emily Davis
        score: 78,
        maxScore: 100,
        submittedAt: new Date('2023-03-12'),
        completionTime: 1800, // 30 minutes
        answers: []
    },
    {
        id: '4',
        testId: '2',
        userId: '2', // Jane Smith
        score: 88,
        maxScore: 100,
        submittedAt: new Date('2023-04-05'),
        completionTime: 1650, // 27.5 minutes
        answers: []
    },
    {
        id: '5',
        testId: '2',
        userId: '3', // Michael Johnson
        score: 95,
        maxScore: 100,
        submittedAt: new Date('2023-04-06'),
        completionTime: 1350, // 22.5 minutes
        answers: []
    },
    {
        id: '6',
        testId: '2',
        userId: '4', // Emily Davis
        score: 90,
        maxScore: 100,
        submittedAt: new Date('2023-04-07'),
        completionTime: 1500, // 25 minutes
        answers: []
    },
    {
        id: '7',
        testId: '3',
        userId: '2', // Jane Smith
        score: 82,
        maxScore: 100,
        submittedAt: new Date('2023-05-15'),
        completionTime: 1700, // 28.3 minutes
        answers: []
    },
    {
        id: '8',
        testId: '3',
        userId: '3', // Michael Johnson
        score: 90,
        maxScore: 100,
        submittedAt: new Date('2023-05-16'),
        completionTime: 1400, // 23.3 minutes
        answers: []
    },
    {
        id: '9',
        testId: '3',
        userId: '4', // Emily Davis
        score: 85,
        maxScore: 100,
        submittedAt: new Date('2023-05-17'),
        completionTime: 1600, // 26.7 minutes
        answers: []
    }
];

// Mock user data for rankings
const mockUserData = [
    { userId: '2', userName: 'Jane Smith', profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' },
    { userId: '3', userName: 'Michael Johnson', profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' },
    { userId: '4', userName: 'Emily Davis', profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80', organization: 'Tech University' },
    { userId: '6', userName: 'Alex Thompson', profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' },
    { userId: '7', userName: 'Sophia Lee', profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', organization: 'Tech University' },
    { userId: '8', userName: 'Daniel Brown', profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' },
    { userId: '9', userName: 'Olivia Martinez', profilePicture: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', organization: 'Tech University' },
    { userId: '10', userName: 'William Taylor', profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' }
];

// Generate mock rankings
const generateMockRankings = (): Ranking[] => {
    // Calculate scores for users with test results
    const userScores = mockTestResults.reduce((acc, result) => {
        if (!acc[result.userId]) {
            acc[result.userId] = {
                totalScore: 0,
                testsCompleted: 0,
                totalPercentage: 0
            };
        }

        acc[result.userId].totalScore += result.score;
        acc[result.userId].testsCompleted += 1;
        acc[result.userId].totalPercentage += (result.score / result.maxScore) * 100;

        return acc;
    }, {} as Record<string, { totalScore: number; testsCompleted: number; totalPercentage: number }>);

    // Create rankings for all users (including those without test results)
    const allRankings = mockUserData.map(user => {
        const userScore = userScores[user.userId] || { totalScore: 0, testsCompleted: 0, totalPercentage: 0 };

        return {
            userId: user.userId,
            userName: user.userName,
            profilePicture: user.profilePicture,
            organization: user.organization,
            totalScore: userScore.totalScore,
            testsCompleted: userScore.testsCompleted,
            averageScore: userScore.testsCompleted > 0
                ? userScore.totalPercentage / userScore.testsCompleted
                : 0,
            rank: 0 // Will be calculated after sorting
        };
    });

    // Sort by average score (descending)
    allRankings.sort((a, b) => b.averageScore - a.averageScore);

    // Assign ranks
    allRankings.forEach((ranking, index) => {
        ranking.rank = index + 1;
    });

    return allRankings;
};

export const useRankingStore = create<RankingState>((set, get) => ({
    rankings: [],
    isLoading: false,

    getRankings: async () => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const rankings = generateMockRankings();
        set({ rankings, isLoading: false });

        return rankings;
    },

    getTopRankings: async (limit = 10) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const rankings = generateMockRankings().slice(0, limit);
        set({ isLoading: false });

        return rankings;
    },

    getUserRanking: async (userId: string) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const rankings = generateMockRankings();
        const userRanking = rankings.find(r => r.userId === userId) || null;

        set({ isLoading: false });

        return userRanking;
    }
}));