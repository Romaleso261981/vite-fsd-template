import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { RootState } from '../../app/rootReducer';
import { auth, db, provider } from '../../integations/firebase';
import { getFirestoreData } from '../../shared/helpers/getData';
import { DatabasePaths } from '../../shared/types/enums';
import { AuthState, User } from '../../shared/types/Types';

export const logOut = createAsyncThunk('auth/logOut', async (_, { rejectWithValue }) => {
  try {
    return localStorage.removeItem('user');
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logIn = createAsyncThunk('auth/logIn', async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, provider);

    const name = result.user.displayName;
    const { email } = result.user;
    const profilePic = result.user.photoURL;
    const data = await getFirestoreData<User>(DatabasePaths.USERS, 20);
    const isExistUser = data.some((obj) => obj.email === email);

    if (isExistUser) {
      const existedUser = data.find((obj) => obj.email === email);

      return existedUser;
    }

    const collectionRef = collection(db, DatabasePaths.USERS);

    await addDoc(collectionRef, {
      profilePic,
      name,
      email,
      rule: 'user',
    });

    const newdata = await getFirestoreData<User>(DatabasePaths.USERS, 20);
    const newUser = newdata.find((obj) => obj.email === email);

    return newUser;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState: AuthState = {
  userData: null,
  loading: false,
  isRegistered: false,
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
      state.userData = payload!;
      state.isRegistered = true;
    });
    builder.addCase(logOut.pending, (state) => {
      state.userData = null;
      state.isRegistered = false;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.isRegistered = false;
      state.loading = false;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const useSelectUserData = (state: RootState) => state.auth.userData;
export const useSelectIsRegistered = (state: RootState) => state.auth.isRegistered;

export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
