import ReviewForm from "../../components/review-form/review-form";
import { Link, Navigate } from "react-router-dom";
import { AppPaths } from "../../App";
import ReviewList from "../../components/review-list/review-list";
import Map from "../../components/map/map";
import OffersList from "../../components/offers-list/offers-list";
import { Offer as OfferType, Review } from "../../types/types";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AuthorizationStatus } from "../../const";
import { getNearbyOffers, getOffer, getReviews } from "../../api/offer-api";
import { Spinner } from "../../components/spinner/spinner";
import { AxiosError } from "axios";


const Offer = () => {

  const { offerId } = useParams<{ offerId: string }>()
  const currentCity = useSelector((state: RootState) => state.city)
  const authStatus = useSelector((state: RootState) => state.authorizationStatus)
  const user = useSelector((state: RootState) => state.user)


  const [offer, setOffer] = useState<OfferType | null>(null);
  const [nearbyOffers, setNearbyOffers] = useState<OfferType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);


  useEffect(() => {
    if (!offerId) return

    setIsLoading(true)
    setNotFound(false)

    Promise.all([getOffer(offerId), getNearbyOffers(offerId), getReviews(offerId)])
      .then(([offerData, nearbyOffersData, reviewsData]) => {
        setOffer(offerData)
        setNearbyOffers(nearbyOffersData)
        setReviews(reviewsData)

      })
      .catch((e) => {
        const error = e as AxiosError;
        if (error.response?.status === 404) {
          setNotFound(true)

        } else {
          console.error(e)
        }
      })
      .finally(() => setIsLoading(false))

  }, [offerId])

  return (
    notFound ? <Navigate to={AppPaths.NotFound} />
      :
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to={AppPaths.Main} className="header__logo-link">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {
                    authStatus === AuthorizationStatus.Auth ?
                      <>
                        <li className="header__nav-item user">
                          <a className="header__nav-link header__nav-link--profile" href="#">
                            <div className="header__avatar-wrapper user__avatar-wrapper">
                            </div>
                            <span className="header__user-name user__name">{user?.email}</span>
                            <span className="header__favorite-count">3</span>
                          </a>
                        </li>
                        <li className="header__nav-item">
                          <a className="header__nav-link" href="#">
                            <span className="header__signout">Sign out</span>
                          </a>
                        </li>
                      </>
                      :
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={AppPaths.Login}>
                          <span className="header__signout">Sign in</span>
                        </Link>
                      </li>
                  }
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {
          !isLoading && offer ?
            <main className="page__main page__main--offer">
              <section className="offer">
                <div className="offer__gallery-container container">
                  <div className="offer__gallery">
                    {
                      offer.images.map((imageUrl, index) => (
                        <div key={index} className="offer__image-wrapper">
                          <img className="offer__image" src={imageUrl} alt="Photo studio" />
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="offer__container container">
                  <div className="offer__wrapper">
                    <div className="offer__mark">
                      <span>{offer?.isPremium}</span>
                    </div>

                    <div className="offer__name-wrapper">
                      <h1 className="offer__name">
                        {offer?.title}
                      </h1>
                      <button className="offer__bookmark-button button" type="button">
                        <svg className="offer__bookmark-icon" width="31" height="33">
                          <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </div>

                    <div className="offer__rating rating">
                      <div className="offer__stars rating__stars">
                        <span style={{ width: `${Math.floor(offer.rating / 5 * 100)}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                      <span className="offer__rating-value rating__value">{offer.rating}</span>
                    </div>

                    <ul className="offer__features">
                      <li className="offer__feature offer__feature--entire">{offer.type}</li>
                      <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                      <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
                    </ul>

                    <div className="offer__price">
                      <b className="offer__price-value">&euro;{offer.price}</b>
                      <span className="offer__price-text">&nbsp;night</span>
                    </div>

                    <div className="offer__inside">
                      <h2 className="offer__inside-title">What&apos;s inside</h2>
                      <ul className="offer__inside-list">
                        <li className="offer__inside-item">Wi-Fi</li>
                        <li className="offer__inside-item">Washing machine</li>
                        <li className="offer__inside-item">Towels</li>
                        <li className="offer__inside-item">Heating</li>
                        <li className="offer__inside-item">Coffee machine</li>
                        <li className="offer__inside-item">Baby seat</li>
                        <li className="offer__inside-item">Kitchen</li>
                        <li className="offer__inside-item">Dishwasher</li>
                        <li className="offer__inside-item">Cabel TV</li>
                        <li className="offer__inside-item">Fridge</li>
                      </ul>
                    </div>

                    <div className="offer__host">
                      <h2 className="offer__host-title">Meet the host</h2>
                      <div className="offer__host-user user">
                        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                          <img
                            className="offer__avatar user__avatar"
                            src={offer.host.avatarUrl}
                            width="74"
                            height="74"
                            alt="Host avatar"
                          />
                        </div>
                        <span className="offer__user-name">{offer.host.name}</span>
                        <span className="offer__user-status">{offer.host.isPro === true ? "Pro" : ""}</span>
                      </div>
                      <div className="offer__description">
                        <p className="offer__text">
                          {offer.description}
                        </p>
                      </div>
                    </div>

                    <section className="offer__reviews reviews">
                      <h2 className="reviews__title">
                        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                      </h2>
                      <ReviewList reviews={reviews} />
                      {authStatus === AuthorizationStatus.Auth &&
                        <ReviewForm onSuccess={() => {
                          if (offerId) getReviews(offerId).then(setReviews).catch(console.error)}} />
                        }
                    </section>
                  </div>
                </div>
                {
                  currentCity && nearbyOffers ?
                    <section className="offer__map map container" style={{ maxWidth: '1144px', backgroundImage: 'none', overflow: 'hidden' }}>
                      <Map offers={nearbyOffers} city={currentCity} activeMarker={undefined} />
                    </section>
                    : <></>
                }
              </section>

              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">
                    Other places in the neighbourhood
                  </h2>
                  <div className="near-places__list places__list">
                    <OffersList offers={nearbyOffers} />
                  </div>
                </section>
              </div>
            </main>
            :
            <Spinner />
        }
      </div>
  )
};

export default Offer;
