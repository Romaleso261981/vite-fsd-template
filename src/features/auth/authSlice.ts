import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';
import { AuthState } from '../user/types';

export type UserCredentials = {
  email?: string;
  password?: string;
  nickName?: string;
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

// export const signUp = createAsyncThunk<void, UserCredentials, { rejectValue: AuthError }>(
//   'auth/signUp',
//   async (newUser, { rejectWithValue }) => {
//     try {
//       // eslint-disable-next-line no-console
//       console.log(newUser);
//     } catch (err: any) {
//       // eslint-disable-next-line
//       return rejectWithValue(err);
//     }
//   },
// );

export const logIn = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/logIn',
  async (newUser, { rejectWithValue }) => {
    try {
      const data = {
        name: 'Roma',
      };

      console.log(data);

      return data;
    } catch (err: any) {
      // eslint-disable-next-line
      return rejectWithValue(err);
    }
  },
);

const initialState: AuthState = {
  nickName: '',
  loading: false,
  error: { message: '', code: '', id: '' },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserNickName(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.nickName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (_, payload) => {
      // eslint-disable-next-line no-console
      console.log('signUp.pending', payload);
    });
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      console.log('logIn.fulfilled', payload);
      state.loading = false;
      state.error.message = '';
    });
    builder.addCase(logIn.rejected, (state) => {
      // eslint-disable-next-line no-console
      console.log('rejected');
      state.loading = false;
      state.error.message = '';
    });
  },
});

// Auth selector
export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => state.auth;

export const { setUserNickName } = authSlice.actions;

export default authSlice.reducer;
