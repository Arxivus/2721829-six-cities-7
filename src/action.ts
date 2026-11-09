import { createAction } from "@reduxjs/toolkit"
import { City, Offer, Location } from "./types/types"

const Actions = {
    CITY_CHANGE: "CITY_CHANGE",
    FILL_BY_OFFERS: "FILL_BY_OFFERS",
    FILTER_OFFERS: "FILTER_OFFERS",
    SET_ACTIVE_MARKER: "ACTIVE_OFFER_MARKER",
}

const changeCity = createAction<City | undefined>(Actions.CITY_CHANGE)
const fillByOffers = createAction<Offer[]>(Actions.FILL_BY_OFFERS)
const filterOffers = createAction<string>(Actions.FILTER_OFFERS)
const setActiveMarker = createAction<Location | undefined>(Actions.SET_ACTIVE_MARKER)

export {
    changeCity,
    fillByOffers,
    filterOffers,
    setActiveMarker
}