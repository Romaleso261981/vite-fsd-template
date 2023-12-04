import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, set } from 'firebase/database';

import { RootState } from '../../app/rootReducer';
import { database } from '../../shared/firebase';
import { AuthState } from '../user/types';

import { AuthError, UserCredentials } from './types';

export const logIn = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/logIn',
  async ({ nickName }, { rejectWithValue }) => {
    try {
      set(ref(database, 'users/asx1a561sx155a1s51x5'), {
        username: nickName,
      });

      console.log('After addDoc');

      // return docRef;
    } catch (err: any) {
      console.error('Error in logIn:', err);

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
      state.setIsRegistered = true;
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
