import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    category_id: number;
    description: string;
    name: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setProducts, setError } = productSlice.actions;

export default productSlice.reducer;
