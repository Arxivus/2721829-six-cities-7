import { createReducer } from "@reduxjs/toolkit"
import { fillByOffers, changeCity, filterOffers, setActiveMarker } from "./action"
import { offersState, OffersStorage } from "./store"
import { filterVariants } from "../data"


const offersReducer = createReducer(offersState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillByOffers, (state, action) => {
      state.offers = action.payload;
      state.unSortedOffers = action.payload;
    })
    .addCase(filterOffers, (state, action) => {
      switch (action.payload) {
        case filterVariants[0]:
          state.offers = state.unSortedOffers;
          break;
        case filterVariants[1]:
          state.offers.sort((o1, o2) => o1.price - o2.price);
          break;
        case filterVariants[2]:
          state.offers.sort((o1, o2) => o2.price - o1.price);
          break
        case filterVariants[3]:
          state.offers.sort((o1, o2) => o2.rating - o1.rating);
          break;
      }
    })
    .addCase(setActiveMarker, (state, action) => {
      state.activeMarker = action.payload;
    })

})

export {
  offersReducer
}