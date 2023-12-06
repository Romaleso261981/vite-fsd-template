import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs } from 'firebase/firestore';

import { RootState } from '../../app/rootReducer';
import { db } from '../../shared/firebase';
import { AuthState } from '../user/types';

import { UserCredentials } from './types';

export const logIn = createAsyncThunk<any, UserCredentials, { rejectValue: any }>(
  'auth/logIn',
  async ({ nickName }, { rejectWithValue }) => {
    try {
      const usersCollection = collection(db, 'user');

      const user = {
        nickName,
      };

      await getDocs(usersCollection).then((d) => {
        d.forEach((d) => {
          console.log(d.get('nickName') !== nickName);
          if (d.get('nickName') === nickName) {
            return alert('nickName must be unique');
          }

          return addDoc(usersCollection, user);
        });
      });

      return nickName;
    } catch (error) {
      rejectWithValue(error);
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
    builder.addCase(logIn.fulfilled, (state) => {
      // state.nickName = payload;
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
