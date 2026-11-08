import {  createReducer, PayloadAction } from "@reduxjs/toolkit"
import { fillByOffers, changeCity } from "./action"
import { City, Offer } from "./types/types"

type OffersStorage = {
    city: City | undefined,
    offers: Offer[]
}

const offersState: OffersStorage = {
    city: undefined,
    offers: []
}

const offersReducer = createReducer(offersState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillByOffers, (state, action) => {
      state.offers = action.payload;
    })

})

export {
    offersReducer,
    offersState,
    type OffersStorage
}