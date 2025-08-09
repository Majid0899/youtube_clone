
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isdark:false
  },
  reducers: {
    toggleTheme:(state,action)=>{
        state.isdark=!state.isdark;
    }
  }


 

});

export const {toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
