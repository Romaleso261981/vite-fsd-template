import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { RootState } from '../../app/rootReducer';

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
  loading: 'idle' | 'pending';
  currentRequestId: undefined;
  error: AuthError | undefined;
};

export const signUp = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  'auth/signUp',
  async () => {},
);

const initialState: AuthState = {
  loading: 'idle',
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
      state.loading = 'idle';
      state.error = undefined;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = 'idle';
      state.error = payload;
    });
  },
});

// Auth selector
// export const selectAuth = (state: RootState) => state.firebase.auth;
// export const selectProfile = (state: RootState) => state.firebase.profile;

export default authSlice.reducer;
