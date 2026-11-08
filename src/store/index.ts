import { configureStore } from "@reduxjs/toolkit";
import { offersReducer } from "../reducer";

const offersStore = configureStore({
    reducer: offersReducer
})

type RootState = ReturnType<typeof offersStore.getState>;

export {
    offersStore,
    type RootState
}