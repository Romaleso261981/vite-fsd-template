import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

import { AuthError, UserCredentials, UserState } from './types';

export const signUp = createAsyncThunk<void, UserCredentials, { rejectValue: AuthError }>(
  'auth/signUp',
  async (newUser, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-console
      console.log(newUser);
    } catch (err: any) {
      // eslint-disable-next-line
      return rejectWithValue(err);
    }
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state) => {
      state.user = undefined;
    });
  },
});

// Auth selector
export const useSelectUser = (state: RootState) => state.auth;
export const { setAppUser } = userSlice.actions;

export default userSlice.reducer;
