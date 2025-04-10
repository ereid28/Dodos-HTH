import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    ecoScore: number;
    userName: string;
}

const initialState: State = {
    ecoScore: 100,
    userName: "",
};

const slice = createSlice({
    name: 'layout',
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
        },
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload.trim();
        }
    },
});

export const { setEcoScore, incrementEcoScore, decrementEcoScore, setUserName } = slice.actions;
export default slice.reducer;
