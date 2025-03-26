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
            state.ecoScore += 1;
        },
        decrementEcoScore(state) {
            if (state.ecoScore > 0) {
                state.ecoScore -= 1;
            }
        }
    },
});

export const { setEcoScore, incrementEcoScore, decrementEcoScore } = ecoScoreSlice.actions;
export default ecoScoreSlice.reducer;
