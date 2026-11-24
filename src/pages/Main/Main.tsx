import OffersList from "../../components/offers-list/offers-list";
import { City, Offer } from "../../types/types";
import Map from "../../components/map/map";
import CitiesList from "../../components/cities-list/cities-list";
import { AuthorizationStatus, cities, filterVariants } from "../../const";
import { useDispatch } from "react-redux";
import { changeCity, filterOffers } from "../../store/action";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AppDispatch, RootState } from "../../store";
import { FilterVariants } from "../../components/filter-variants/filter-variants";
import { Spinner } from "../../components/spinner/spinner";
import { Link } from "react-router-dom"
import { AppPaths } from "../../App";

type MainPageProps = {
  offers: Offer[],
  offersCount: number;
}

const MainPage = ({ offers }: MainPageProps) => {

  const dispatch = useDispatch<AppDispatch>()

  const currentCity = useSelector((state: RootState) => state.city)
  const currentOffers = offers.filter(offer => offer.city.name === currentCity?.name)
  const activeMarker = useSelector((state: RootState) => state.activeMarker)
  const isLoading = useSelector((state: RootState) => state.isLoadingOffers)
  const authStatus = useSelector((state: RootState) => state.authorizationStatus)
  const user = useSelector((state: RootState) => state.user)

  const handleChangeCity = (newCity: City | undefined) => {
    if (!newCity) return

    dispatch(changeCity(newCity))
  }

  const handleFilterChange = (filterName: string) => {
    dispatch(filterOffers(filterName))
  }


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
                {
                  isLoading ? <Spinner />
                    : <OffersList offers={currentOffers} />
                }
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
