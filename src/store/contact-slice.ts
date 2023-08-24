import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface Contact {
  id: React.Key;
  firstName: String;
  lastName: String;
  status: Boolean;
}
const initialState: Array<Contact> = [];

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    //Adding New Contact Reducer
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    //Updating Contact Reducer
    updateContact: (state, action: PayloadAction<Contact>) => {
      const { id } = action.payload;
      const index = state.findIndex((contact) => id === contact.id);
      state[index] = action.payload;
    },
    //Deleting Contact Reducer
    deleteContact: (state, action: PayloadAction<React.Key>) => {
      const id = action.payload;
      return state.filter((contact) => contact.id !== id);
    },
  },
});

export default contactSlice.reducer;
export const contactActions = contactSlice.actions;
export const contactSelector = (state: RootState) => state.contactReducer;
