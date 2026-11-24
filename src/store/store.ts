import { cities } from "../const"
import { City, Offer, Location, UserInfo } from "../types/types"

type OffersStorage = {
  authorizationStatus: string,
  user: UserInfo | undefined,
  city: City | undefined,
  offers: Offer[]
  filteredOffers: Offer[]
  activeMarker: Location | undefined
  isLoadingOffers: boolean
}

const offersState: OffersStorage = {
  authorizationStatus: 'Unknown',
  user: undefined,
  city: cities[0],
  offers: [],
  filteredOffers: [],
  activeMarker: undefined,
  isLoadingOffers: true,
}

export {
    offersState,
    type OffersStorage
}