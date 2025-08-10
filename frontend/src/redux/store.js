import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice.js'
import sideBarReducer from './sidebarslice.js'
import userReducer from './userSlice.js'
const appStore = configureStore({
  reducer: {
    theme:themeReducer,
    SideBar:sideBarReducer,
    user:userReducer
  },
});
export default appStore;