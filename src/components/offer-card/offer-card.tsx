import { Offer } from "../../types/types";
import { Link } from "react-router-dom";
import { useStore } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store";
import { setActiveMarker } from "../../action";

type OfferCardProps = {
  offer: Offer
  isStyleFavorite?: boolean
}

const OfferCard = ({ offer, isStyleFavorite = false }: OfferCardProps) => {

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const store = useStore()
  const activeMarker = useSelector((state: RootState) => state.activeMarker)

  const handleCardHover = () => {
    store.dispatch(setActiveMarker(offer.location))
  }

  const handleCardLeave = () => {
    const offerLat = offer.location.latitude
    const offerLon = offer.location.longitude

    if (activeMarker && offerLat == activeMarker.latitude && offerLon == activeMarker.longitude) {
      store.dispatch(setActiveMarker(undefined))
    }
  }

  return (

    <article
      className={` ${isStyleFavorite ? 'favorites__card' : 'cities__card'} place-card`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className={`${isStyleFavorite ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </article>
  )
}

export default OfferCard
