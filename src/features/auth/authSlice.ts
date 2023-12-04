import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';
import { AuthState } from '../user/types';

import { AuthError, UserCredentials } from './types';

export const logIn = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/logIn',
  async (newUser, { rejectWithValue }) => {
    try {
      const data = {
        name: 'Roma',
      };

      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

const initialState: AuthState = {
  nickName: '',
  loading: false,
  setIsRegistered: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserNickName(state, action: PayloadAction<string>) {
      state.nickName = action.payload;
      state.setIsRegistered = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.nickName = payload;
      state.loading = false;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => state.auth;

export const { setUserNickName } = authSlice.actions;

export default authSlice.reducer;
