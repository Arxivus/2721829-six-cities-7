import { Offer } from "../../types/types"
import OfferCard from "../offer-card/offer-card"

type OffersListProps = {
    offers?: Offer[]
    isStyleFavorite?: boolean
}

const OffersList = ({ offers, isStyleFavorite }: OffersListProps) => {

    return (
        <>
            {
                offers ? (
                    offers.map(offer => (
                        <OfferCard
                            key={offer.id}
                            offer={offer}
                            isStyleFavorite={isStyleFavorite}
                        />
                    ))
                ) : <div>Предложения не найдены</div>
            }
        </>
    )
}

export default OffersList