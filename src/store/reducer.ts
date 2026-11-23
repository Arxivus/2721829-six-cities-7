import { createReducer } from "@reduxjs/toolkit"
import { fillByOffers, changeCity, filterOffers, setActiveMarker, setLoadingStatus } from "./action"
import { offersState } from "./store"
import { filterVariants } from "../const"


const offersReducer = createReducer(offersState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillByOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(filterOffers, (state, action) => {
      switch (action.payload) {
        case filterVariants[0]:
          state.filteredOffers = state.offers;
          break;
        case filterVariants[1]:
          state.filteredOffers = state.offers.sort((o1, o2) => o1.price - o2.price);
          break;
        case filterVariants[2]:
          state.filteredOffers = state.offers.sort((o1, o2) => o2.price - o1.price);
          break
        case filterVariants[3]:
          state.filteredOffers = state.offers.sort((o1, o2) => o2.rating - o1.rating);
          break;
      }
    })
    .addCase(setActiveMarker, (state, action) => {
      state.activeMarker = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoadingOffers =  action.payload;
    }

)

})

export {
  offersReducer
}