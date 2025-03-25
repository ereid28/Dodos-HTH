import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EcoScoreState {
    ecoScore: number;
}

const initialState: EcoScoreState = {
    ecoScore: 100,
};

const ecoScoreSlice = createSlice({
    name: 'ecoScore',
    initialState,
    reducers: {
        setEcoScore(state, action: PayloadAction<number>) {
            state.ecoScore = action.payload;
        },
        incrementEcoScore(state) {
            if (state.ecoScore < 100) {
                state.ecoScore += 1;
            }
        }
    },
});

export const { setEcoScore, incrementEcoScore } = ecoScoreSlice.actions;
export default ecoScoreSlice.reducer;