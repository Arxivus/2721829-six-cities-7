import { useState } from "react"
import { type Offer } from "../../mocks/offer"
import OfferCard from "../offer-card/offer-card"

type OffersListProps = {
    offers: Offer[]
}

const OffersList = ({ offers }: OffersListProps ) => {
    const [activeOffer, setActiveOffer] = useState<Offer| null>(null)

    return (
        <>
            {
                offers ? (
                    offers.map(offer => (
                        <OfferCard 
                        key={offer.id}
                        offer={offer} 
                        onMouseEnter={() => setActiveOffer(offer)}
                        onMouseLeave={() => setActiveOffer(null)}
                        />
                    ))
                ) : <div>Предложения не найдены</div>
            }
        </>
    )
}

export default OffersList