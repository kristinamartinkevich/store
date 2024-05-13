import { ADD_TO_CART } from './actionTypes';
import { CartActionTypes } from './actions';
import { ProductOrder } from './model';

interface CartState {
    productsInCart: ProductOrder[];
}

const initialState: CartState = {
    productsInCart: [],
};

const rootReducer = (state: CartState = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                productsInCart: [...state.productsInCart, action.payload],
            };
        default:
            return state;
    }
};

export default rootReducer;