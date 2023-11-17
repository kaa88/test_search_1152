import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SearchItem {
   id: number;
}

interface State {
   isLoading: boolean;
   loadError: string;
   list: SearchItem[];
}

const initialState: State = {
   isLoading: false,
   loadError: '',
   list: []
};

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      updateSearchList(state, action: PayloadAction<string | State>) {
         // state.list = action.payload;
      }
   }
});

export const { updateSearchList } = searchSlice.actions;
export default searchSlice.reducer;
