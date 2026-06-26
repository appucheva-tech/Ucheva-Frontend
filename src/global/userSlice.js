import { createSlice } from "@reduxjs/toolkit";

//
// USER SLICE
//
const userInitialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };  
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

const staffInitialState = {
  staffUser: null,
  staffToken: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState: staffInitialState,
  reducers: {
    setStaffUser: (state, action) => {
      state.staffUser = action.payload;
    },
    setStaffToken: (state, action) => {
      state.staffToken = action.payload;
    },
    clearStaff: (state) => {
      state.staffUser = null;
      state.staffToken = null;
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export const { setStaffUser, setStaffToken, clearStaff } = staffSlice.actions;

export const userReducer = userSlice.reducer;
export const staffReducer = staffSlice.reducer;
