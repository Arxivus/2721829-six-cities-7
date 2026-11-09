import OffersList from "../../components/offers-list/offers-list";
import { City, Offer } from "../../types/types";
import Map from "../../components/map/map";
import { useEffect, useState } from "react";
import CitiesList from "../../components/cities-list/cities-list";
import { cities, filterVariants } from "../../data";
import { useStore } from "react-redux";
import { changeCity, fillByOffers, filterOffers } from "../../action";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../store";
import { FilterVariants } from "../../components/filter-variants/filter-variants";

type MainPageProps = {
  offers: Offer[],
  offersCount: number;
}

const MainPage = ({ offers }: MainPageProps) => {

  const store = useStore()
  const currentCity = useSelector((state: RootState) => state.city)
  const currentOffers = useSelector((state: RootState) => state.offers)
  const activeMarker = useSelector((state: RootState) => state.activeMarker)

  const handleChangeCity = (newCity: City | undefined) => {
    store.dispatch(changeCity(newCity))
    store.dispatch(fillByOffers(offers.filter(offer => offer.city.name == newCity?.name)))
  }

  const handleFilterChange = (filterName: string) => {
      store.dispatch(filterOffers(filterName))
  }

  useEffect(() => {
    if (cities && offers) {
      handleChangeCity(cities.find(city => city.name == 'Paris'))
    }
  }, [])


  return (

    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              currentCity={currentCity}
              changeCurrentCity={handleChangeCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers?.length} places to stay in {currentCity?.name}</b>
              <FilterVariants
                variants={filterVariants}
                filterBy={handleFilterChange}
              />
              <div className="cities__places-list places__list tabs__content">
                <OffersList offers={currentOffers} />
              </div>
            </section>
            <div className="cities__right-section">
              <section
                className="cities__map map"
                style={{ maxWidth: '512px', maxHeight: '800px', backgroundImage: 'none', overflow: 'hidden' }}
              >
                {
                  currentCity && currentOffers && <Map offers={currentOffers} city={currentCity} activeMarker={activeMarker} />
                }
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainPage;
