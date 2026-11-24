import { createAction } from "@reduxjs/toolkit"
import { City, Offer, Location, UserInfo } from "../types/types"
import { AuthorizationStatus } from "../const"

const Actions = {
    CITY_CHANGE: "CITY_CHANGE",
    FILL_BY_OFFERS: "FILL_BY_OFFERS",
    FILTER_OFFERS: "FILTER_OFFERS",
    SET_ACTIVE_MARKER: "ACTIVE_OFFER_MARKER",
    SET_LOADING_STATUS: "SET_LOADING_STATUS",
    CHANGE_AUTH_STATUS: "CHANGE_AUTH_STATUS",
    SET_USER_DATA: "SET_USER_DATA"
}

const changeCity = createAction<City | undefined>(Actions.CITY_CHANGE)
const fillByOffers = createAction<Offer[]>(Actions.FILL_BY_OFFERS)
const filterOffers = createAction<string>(Actions.FILTER_OFFERS)
const setActiveMarker = createAction<Location | undefined>(Actions.SET_ACTIVE_MARKER)
const setLoadingStatus = createAction<boolean>(Actions.SET_LOADING_STATUS)
const changeAuthStatus = createAction<string>(Actions.CHANGE_AUTH_STATUS)
const setUserData = createAction<UserInfo>(Actions.SET_USER_DATA)

export {
    changeCity,
    fillByOffers,
    filterOffers,
    setActiveMarker,
    setLoadingStatus,
    changeAuthStatus,
    setUserData
}