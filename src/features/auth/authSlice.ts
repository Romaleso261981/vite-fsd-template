import { notifications } from '@mantine/notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';
import { constans } from '../../shared/constans/constans';
import { setFirestoreData } from '../../shared/helpers/addDoc';
import { getFirestoreData } from '../../shared/helpers/getData';
import { AuthState } from '../user/types';

export const logIn = createAsyncThunk(
  'auth/signUp',
  async (nickName: string, { rejectWithValue }) => {
    try {
      const data = await getFirestoreData(constans.databasePaths);
      const isNickNameExists = data.some((obj) => obj.nickName === nickName);

      if (!isNickNameExists) {
        setFirestoreData(nickName, constans.databasePaths);

        return nickName;
      }
      notifications.show({
        bg: 'cyan',
        w: '450',
        h: '80',
        message: 'You must enter a unique nickName',
      });
    } catch (err) {
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
