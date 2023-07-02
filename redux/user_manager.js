import {createSlice} from '@reduxjs/toolkit';

//this slice manages the logged in user
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {

  },
});
