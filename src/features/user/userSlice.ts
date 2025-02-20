import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootReducer';
import { getFirestoreData } from '../../shared/helpers/getData';
import { hookEditUser } from '../../shared/helpers/hookEditUser';
import { DatabasePaths } from '../../shared/types/enums';
import { User, UserState } from '../../shared/types/Types';

const initialState: UserState = {
  user: null,
  usersData: [],
  users: [],
  loading: false,
};

interface UserCredentials {
  id: string;
  user: Partial<User>;
}

export const getData = createAsyncThunk(
  'user/getData',
  async (_, { rejectWithValue }) => {
    try {
      return await getFirestoreData<User>(DatabasePaths.USERS);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ id, user }: UserCredentials, { rejectWithValue }) => {
    try {
      if (id) {
        await hookEditUser({ id, user });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.usersData = payload;
      state.loading = false;
    });
  },
});

export const useSelectData = (state: RootState) => state.user.usersData;
export const useSelectLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
