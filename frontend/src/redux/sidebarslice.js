
import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebarOpen:true
  },
  reducers: {
    toggleSidebar:(state,action)=>{
        state.sidebarOpen=!state.sidebarOpen;
        
        
    }
  }


 

});

export const {toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
