import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

export type UserCredentials = {
  email: string;
  password: string;
};
export type IresData = {
  str: string;
};

export type User = {
  firstName: string;
  lastName: string;
  initials: string;
};

export type NewUser = User & UserCredentials;

export type AuthError = {
  code: string;
  message: string;
  id: string;
};

export type AuthState = {
  loading: false | true;
  Id: undefined | '';
  error: AuthError | undefined | any;
};

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

const initialState: AuthState = {
  loading: false,
  Id: undefined,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (_, payload) => {
      // eslint-disable-next-line no-console
      console.log('signUp.pending', payload);
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      // eslint-disable-next-line no-console
      console.log('rejected');
      state.loading = false;
      state.error = payload;
    });
  },
});

// Auth selector
export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
