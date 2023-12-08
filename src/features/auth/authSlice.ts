import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, addDoc, limit } from 'firebase/firestore';

import { RootState } from '../../app/rootReducer';
import { db } from '../../integations/firebase';
import { AuthState } from '../user/types';

import { User } from './types';

export const logIn = async <T extends { nickName: string }>({ nickName }: User) => {
  const collectionRef = collection(db, 'users');

  const q = query(collectionRef, limit(20));

  const querySnapshot = await getDocs(q);
  const data: User[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as T);
  });

  const isNickNameExists = data.some((obj) => obj.nickName === nickName);

  if (isNickNameExists) return;
  addDoc(collectionRef, { nickName });

  return data;
};

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
  // extraReducers: (builder) => {
  //   builder.addCase(logIn.pending, (state) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(logIn.fulfilled, (state) => {
  //     // state.nickName = payload;
  //     state.setIsRegistered = true;
  //     state.loading = false;
  //   });
  //   builder.addCase(logIn.rejected, (state) => {
  //     state.loading = false;
  //   });
  // },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => state.auth;

export const { setUserNickName } = authSlice.actions;

export default authSlice.reducer;
