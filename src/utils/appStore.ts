import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
const appStore: EnhancedStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
