import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer from './src/modules/store/components/category/CategorySlice';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
