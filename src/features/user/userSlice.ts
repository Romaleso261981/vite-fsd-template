import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

import { User, UserState } from './types';

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAppUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: () => {},
});

export const useSelectUser = (state: RootState) => state.user.user;
export const { setAppUser } = userSlice.actions;

export default userSlice.reducer;
