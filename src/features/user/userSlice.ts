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

export const getData = createAsyncThunk(
  'user/getData',
  async (_, { rejectWithValue }) => {
    try {
      return await getFirestoreData<User>(DatabasePaths.USERS, 20);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async (
    { id, updatedUser }: { id: string; updatedUser: Partial<User> },
    { rejectWithValue },
  ) => {
    try {
      await hookEditUser({ id, updatedUser });
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
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.usersData = payload;
      state.loading = true;
    });
  },
});

export const useSelectData = (state: RootState) => state.user.usersData;

export default userSlice.reducer;
