import { createSlice } from "@reduxjs/toolkit";
import { UserDets } from "../services/Props";

interface InitialProp {
  isLoggedIn: boolean;
  active:number;
  userData: UserDets;
  token:string;
}

const initialState: InitialProp = {
  isLoggedIn: false,
  active:2,
  userData: {
    _id: "",
    name: "",
    email: "",
    img: "",
  },
  token:"",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
    storeToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsLoggedIn,setActive, storeUserData ,storeToken} = userSlice.actions;

export default userSlice.reducer;
