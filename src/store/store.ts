import { City, Offer, Location } from "../types/types"

type OffersStorage = {
  city: City | undefined,
  offers: Offer[]
  unSortedOffers: Offer[]
  activeMarker: Location | undefined
}

const offersState: OffersStorage = {
  city: undefined,
  offers: [],
  unSortedOffers: [],
  activeMarker: undefined
}

export {
    offersState,
    type OffersStorage
}