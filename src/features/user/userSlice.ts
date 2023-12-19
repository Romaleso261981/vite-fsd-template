import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

import { UserState } from './types';

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAppUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
  extraReducers: () => {},
});

export const useSelectUser = (state: RootState) => state.auth;
export const { setAppUser } = userSlice.actions;

export default userSlice.reducer;
