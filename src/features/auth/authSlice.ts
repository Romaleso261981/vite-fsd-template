import { notifications } from '@mantine/notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, query, addDoc, limit } from 'firebase/firestore';

import { RootState } from '../../app/rootReducer';
import { getData } from '../../helpers/getData';
import { db } from '../../integations/firebase';
import { AuthState } from '../user/types';

import { User, UserReq } from './types';

type Key = keyof UserReq;

const arr: Key = 'code';

export const logIn = createAsyncThunk(
  'auth/signUp',
  async (nickName: string, { rejectWithValue }) => {
    try {
      const collectionRef = collection(db, 'users');

      const q = query(collectionRef, limit(20));

      const querySnapshot = await getDocs(q);
      const data: User[] = [];

      console.log(arr.includes('c'));

      querySnapshot.forEach((doc) => {
        const d = getData(doc);

        data.push(d);
      });

      const isNickNameExists = data.some((obj) => obj.nickName === nickName);

      if (!isNickNameExists) {
        addDoc(collectionRef, { nickName });

        return nickName;
      }
      notifications.show({
        bg: 'cyan',
        w: '450',
        h: '80',
        message: 'You must enter a unique nickName',
      });
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      if (typeof payload === 'string') state.nickName = payload;
      state.setIsRegistered = payload !== undefined;
      state.loading = false;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
