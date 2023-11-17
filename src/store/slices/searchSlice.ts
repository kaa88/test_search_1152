import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface State {
   name: string;
   content: any;
}

const initialState = {
   active: '',
   content: ''
};

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      setActiveModal(state, action: PayloadAction<string | State>) {
         if (!action.payload) state.active = state.content = '';
         if (typeof action.payload === 'string') {
            state.active = action.payload;
            state.content = '';
         }
         if (typeof action.payload === 'object' && !Array.isArray(action.payload)) {
            state.active = action.payload.name || '';
            state.content = action.payload.content || '';
         }
      }
   }
});

export const { setActiveModal } = searchSlice.actions;
export default searchSlice.reducer;
