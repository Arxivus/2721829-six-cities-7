import { configureStore } from "@reduxjs/toolkit";
import { offersReducer } from "./reducer";
import { createAPI } from "../api/api";

const apiAxios = createAPI()

const offersStore = configureStore({
    reducer: offersReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: apiAxios
            },
        })
})

type RootState = ReturnType<typeof offersStore.getState>;
type AppDispatch = typeof offersStore.dispatch

export {
    offersStore,
    type RootState,
    type AppDispatch,
    apiAxios
}