import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slice';

const store = configureStore({
    reducer: {
        layout: layoutReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;