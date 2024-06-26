import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ProductData } from './modules/store/components/products/ProductList';
import { OrderInfo } from './model';

const addToCartSlice = createSlice({
    name: 'cart',
    initialState: { products: [] as ProductData[], orderInfo: {} as OrderInfo },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        placeOrder: (state, action) => {
            state.orderInfo = action.payload;
        },
        clear: (state) => {
            state.orderInfo = {} as OrderInfo;
            state.products = [];
        }
    }
});

export const { addProduct, placeOrder, clear } = addToCartSlice.actions;

export const store = configureStore({
    reducer: addToCartSlice.reducer
});

store.subscribe(() => console.log(store.getState()));