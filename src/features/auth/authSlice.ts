import { notifications } from '@mantine/notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';
import { setFirestoreData } from '../../shared/helpers/addDoc';
import { getFirestoreData } from '../../shared/helpers/getData';
import { DatabasePaths } from '../../shared/types/enums';
import { UserData } from '../../shared/types/Types';
import { AuthState } from '../user/types';

export const logIn = createAsyncThunk(
  'auth/signUp',
  async (nickName: string, { rejectWithValue }) => {
    try {
      const data = await getFirestoreData<UserData>(DatabasePaths.USERS, 20);

      const isNickNameExists = data.some((obj) => obj.nickName === nickName);

      if (!isNickNameExists) {
        setFirestoreData({ nickName }, DatabasePaths.USERS);
        localStorage.setItem('nickName', nickName);

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
  nickName: null,
  loading: false,
  setIsRegistered: false,
  user: null,
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

export const selectNickame = (state: RootState) => state.auth.nickName;
export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
