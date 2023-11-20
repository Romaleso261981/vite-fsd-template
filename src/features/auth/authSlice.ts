import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';

export type UserCredentials = {
  email: string;
  password: string;
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
  currentRequestId: undefined;
  error: AuthError | undefined;
};

export const signUp = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  'auth/signUp',
  async (newUser) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const { firstName, lastName, email, password } = newUser;

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await firestore
        .collection('users')
        .doc(response.user?.uid)
        .set({
          firstName,
          lastName,
          initials: firstName[0] + lastName[0],
        });
    } catch (err) {
      // const { code, message } = err;
      // return rejectWithValue({ code, message, id: '12' });
    }
  },
);

const initialState: AuthState = {
  loading: false,
  currentRequestId: undefined,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, () => {
      // eslint-disable-next-line no-console
      console.log('signUp.pending');
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
// export const selectAuth = (state: RootState) => state.firebase.auth;
// export const selectProfile = (state: RootState) => state.firebase.profile;

export default authSlice.reducer;
