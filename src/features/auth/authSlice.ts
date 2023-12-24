import { notifications } from '@mantine/notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';
import { setFirestoreData } from '../../shared/helpers/addDoc';
import { getFirestoreData } from '../../shared/helpers/getData';
import { DatabasePaths } from '../../shared/types/enums';
import { UserData } from '../../shared/types/Types';
import { AuthState, User } from '../user/types';

export const logIn = createAsyncThunk(
  'auth/signUp',
  async (nickName: string, { rejectWithValue }) => {
    try {
      const data = await getFirestoreData<UserData>(DatabasePaths.USERS, 20);

      const isNickNameExists = data.some((obj) => obj.nickName === nickName);
      const balans = 156478;

      if (!isNickNameExists) {
        const user: User = {
          nickName,
          balans,
          email: 'example@gmail.com',
          phone: '0695652588',
          rule: 'user',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRha3ZLzP9ZTL3GBQOJ47Aqt_qxI00So-ciiw&usqp=CAU',
        };

        setFirestoreData(user, DatabasePaths.USERS);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
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
  user: null,

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
      state.setIsRegistered = payload !== undefined;
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const useSelectUser = (state: RootState) => state.auth.user;
export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
