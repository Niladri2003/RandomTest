import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import testReducer from './slices/testSlice';
import rankingReducer from './slices/rankingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        test: testReducer,
        ranking: rankingReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;