import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';

export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  firstName: string;
  phoneNumber: string;
};

export type NewUser = User & UserCredentials;

export type AuthError = {
  code: string;
  message: string;
  id: string;
};

export type UserState = {
  user: null | {} | undefined;
  error: AuthError | undefined | null;
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

const initialState: UserState = {
  user: {},
  error: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state) => {
      state.error = undefined;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

// Auth selector
export const selectUser = (state: RootState) => state.auth;

export default userSlice.reducer;
