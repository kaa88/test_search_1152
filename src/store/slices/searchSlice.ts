import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../types/types';
import FetchService from '../../services/FetchService';
import { AxiosError } from 'axios';

interface State {
   isLoading: boolean;
   loadError: string | null;
   list: IPost[];
   fragment: string;
}

const initialState: State = {
   isLoading: true,
   loadError: null,
   list: [],
   fragment: ''
};

export const updateSearchList = createAsyncThunk('', async (searchStr: string) => {
   const response = await FetchService.getList(searchStr);
   return response.data;
});

export const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      updateSearchFragment(state, action: PayloadAction<string>) {
         state.fragment = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(updateSearchList.pending, (state) => {
         state.isLoading = true;
         state.loadError = null;
      });
      builder.addCase(updateSearchList.rejected, (state, action) => {
         let error: State['loadError'] = 'Unknown error';
         if (action.payload instanceof AxiosError && action.payload.response?.data)
            error = action.payload.response?.data;
         state.loadError = error;
      });
      builder.addCase(updateSearchList.fulfilled, (state, action) => {
         state.isLoading = false;
         state.loadError = null;
         state.list = action.payload;
      });
   }
});

export const { updateSearchFragment } = searchSlice.actions;
export default searchSlice.reducer;
