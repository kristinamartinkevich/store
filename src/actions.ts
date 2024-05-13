import { ADD_TO_CART } from './actionTypes';
import { ProductOrder } from './model';

export const addToCart = (product: ProductOrder) => ({
    type: ADD_TO_CART,
    payload: product,
});

export type CartActionTypes = ReturnType<typeof addToCart>;