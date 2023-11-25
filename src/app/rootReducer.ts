import { combineReducers } from '@reduxjs/toolkit';
// Reducers

import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
