import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Ranking, TestResult } from '../../types';

// Mock test results for demo
const mockTestResults: TestResult[] = [
    {
        id: '1',
        testId: '1',
        userId: '2',
        score: 85,
        maxScore: 100,
        submittedAt: new Date('2023-03-10'),
        completionTime: 1500,
        answers: []
    },
    {
        id: '2',
        testId: '1',
        userId: '3',
        score: 92,
        maxScore: 100,
        submittedAt: new Date('2023-03-11'),
        completionTime: 1200,
        answers: []
    }
];

// Mock user data for rankings
const mockUserData = [
    { userId: '2', userName: 'Jane Smith', profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' },
    { userId: '3', userName: 'Michael Johnson', profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80', organization: 'Tech University' }
];

const generateMockRankings = (): Ranking[] => {
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
            rank: 0
        };
    });

    allRankings.sort((a, b) => b.averageScore - a.averageScore);
    allRankings.forEach((ranking, index) => {
        ranking.rank = index + 1;
    });

    return allRankings;
};

interface RankingState {
    rankings: Ranking[];
    userRanking: Ranking | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: RankingState = {
    rankings: [],
    userRanking: null,
    isLoading: false,
    error: null
};

export const getRankings = createAsyncThunk(
    'ranking/getAll',
    async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        return generateMockRankings();
    }
);

export const getTopRankings = createAsyncThunk(
    'ranking/getTop',
    async (limit: number = 10) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        return generateMockRankings().slice(0, limit);
    }
);

export const getUserRanking = createAsyncThunk(
    'ranking/getUserRanking',
    async (userId: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const rankings = generateMockRankings();
        const userRanking = rankings.find(r => r.userId === userId);
        if (!userRanking) {
            throw new Error('User ranking not found');
        }

        return userRanking;
    }
);

const rankingSlice = createSlice({
    name: 'ranking',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Get All Rankings
        builder
            .addCase(getRankings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRankings.fulfilled, (state, action: PayloadAction<Ranking[]>) => {
                state.isLoading = false;
                state.rankings = action.payload;
            })
            .addCase(getRankings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch rankings';
            });

        // Get Top Rankings
        builder
            .addCase(getTopRankings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTopRankings.fulfilled, (state, action: PayloadAction<Ranking[]>) => {
                state.isLoading = false;
                state.rankings = action.payload;
            })
            .addCase(getTopRankings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch top rankings';
            });

        // Get User Ranking
        builder
            .addCase(getUserRanking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserRanking.fulfilled, (state, action: PayloadAction<Ranking>) => {
                state.isLoading = false;
                state.userRanking = action.payload;
            })
            .addCase(getUserRanking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch user ranking';
            });
    }
});

export const { clearError } = rankingSlice.actions;
export default rankingSlice.reducer;