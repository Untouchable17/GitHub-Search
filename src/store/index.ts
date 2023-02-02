import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { githubAPI } from "./github/github.api";


export const store = configureStore({
	
	reducer: {
		[githubAPI.reducerPath]: githubAPI.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubAPI.middleware)
})


setupListeners(store.dispatch)
