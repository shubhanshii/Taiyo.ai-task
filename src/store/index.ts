import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contact-slice';

export const store = configureStore({
  reducer: { contactReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
