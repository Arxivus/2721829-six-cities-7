import { createAction } from "@reduxjs/toolkit"
import { City, Offer } from "./mocks/offer"

const Actions = {
    CITY_CHANGE: "CITY_CHANGE",
    FILL_BY_OFFERS: "FILL_BY_OFFERS",
}

const changeCity = createAction<City>(Actions.CITY_CHANGE)
const fillByOffers = createAction<Offer[]>(Actions.FILL_BY_OFFERS)

export {
    changeCity,
    fillByOffers
}