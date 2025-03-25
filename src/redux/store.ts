import { configureStore } from '@reduxjs/toolkit';
import ecoScoreReducer from './ecoScoreSlice';

const store = configureStore({
    reducer: {
        ecoScore: ecoScoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;