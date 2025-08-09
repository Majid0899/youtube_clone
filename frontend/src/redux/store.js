import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice.js'
import sideBarReducer from './sidebarslice.js'

const appStore = configureStore({
  reducer: {
    theme:themeReducer,
    SideBar:sideBarReducer
  },
});
export default appStore;