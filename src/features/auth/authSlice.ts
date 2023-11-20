import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getFirebase } from 'react-redux-firebase';

import { RootState } from '../../app/rootReducer';

export type UserCredentials = {
  email: string;
  password: string;
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

export type AuthState = {
  loading: false | true;
  Id: undefined | '';
  error: AuthError | undefined | any;
};

export const signUp = createAsyncThunk<any, User, { rejectValue: AuthError }>(
  'auth/signUp',
  async (str, { rejectWithValue }) => {
    // eslint-disable-next-line no-console
    console.log(str);
    // const firebase = getFirebase();
    // const firestore = firebase.firestore();
    // const { firstName, lastName, email, password } = newUser;

    try {
      // const response = await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password);
      // await firestore
      //   .collection('users')
      //   .doc(response.user?.uid)
      //   .set({
      //     firstName,
      //     lastName,
      //     initials: firstName[0] + lastName[0],
      //   });
    } catch (err: any) {
      // eslint-disable-next-line
      return rejectWithValue(err);
    }
  },
);

const initialState: AuthState = {
  loading: false,
  Id: undefined,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (_, payload) => {
      // eslint-disable-next-line no-console
      console.log('signUp.pending', payload);
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

// Auth selector
export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
