import { cities } from "../const"
import { City, Offer, Location } from "../types/types"

type OffersStorage = {
  city: City | undefined,
  offers: Offer[]
  filteredOffers: Offer[]
  activeMarker: Location | undefined
  isLoadingOffers: boolean
}

const offersState: OffersStorage = {
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