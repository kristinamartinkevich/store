import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecommendationsState {
    selectedCategoryId: number | null;
}

const initialState: RecommendationsState = {
    selectedCategoryId: null,
};

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {
        selectCategory(state, action: PayloadAction<number>) {
            state.selectedCategoryId = action.payload;
        },
    },
});

export const { selectCategory } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
