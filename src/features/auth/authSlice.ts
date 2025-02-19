import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { RootState } from '@/app/rootReducer';
import { auth, db, provider } from '@/integations/firebase';
import { getFirestoreData } from '@/shared/helpers/getData';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/shared/helpers/useLocalStorage';
import { DatabasePaths } from '@/shared/types/enums';
import { AuthState, User } from '@/shared/types/Types';

export const logOut = createAsyncThunk('auth/logOut', async (_, { rejectWithValue }) => {
  try {
    removeLocalStorage('user');
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const googleLogIn = createAsyncThunk(
  'auth/googleLogIn',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const name = result.user.displayName;
      const { email } = result.user;
      const profilePic = result.user.photoURL;
      const data = await getFirestoreData<User>(DatabasePaths.USERS);
      const isExistUser = data.some((obj) => obj.email === email);

      if (isExistUser) {
        const existedUser = data.find((obj) => obj.email === email);

        setLocalStorage('user', JSON.stringify(existedUser));

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

      setLocalStorage('user', JSON.stringify(newUser));

      return newUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const githubLogIn = createAsyncThunk(
  'auth/githubLogIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = {
        id: '',
        email: '',
        rule: '',
        name: '',
        profilePic: '',
      } as User;

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const currentUser = createAsyncThunk(
  'user/currentUser',
  async (_, { rejectWithValue }) => {
    try {
      const localStorageUser = getLocalStorage('user');

      let user = null;

      if (localStorageUser) {
        user = JSON.parse(localStorageUser);
      }

      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
    builder.addCase(googleLogIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleLogIn.fulfilled, (state, { payload }) => {
      state.userData = payload ?? null;
      state.isRegistered = true;
    });
    builder.addCase(currentUser.fulfilled, (state, { payload }) => {
      state.userData = payload ?? null;
      state.isRegistered = true;
    });
    builder.addCase(githubLogIn.fulfilled, (state, { payload }) => {
      state.isRegistered = true;
      state.userData = payload ?? null;
    });
    builder.addCase(logOut.pending, (state) => {
      state.userData = null;
      state.isRegistered = false;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.isRegistered = false;
      state.loading = false;
    });
    builder.addCase(googleLogIn.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const useSelectUserData = (state: RootState) => state.auth.userData;
export const useSelectIsRegistered = (state: RootState) => state.auth.isRegistered;

export const selectProfile = (state: RootState) => state.auth;

export default authSlice.reducer;
