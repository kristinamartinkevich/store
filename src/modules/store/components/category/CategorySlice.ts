import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
    id: number;
    name: string;
    parent_id: number;
};

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        fetchCategoriesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchCategoriesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
