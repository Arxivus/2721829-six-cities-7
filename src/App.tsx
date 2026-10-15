import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/main';
import NotFound from './pages/not-found/not-found';
import Login from './pages/login/login';
import Favorites from './pages/favorites/favorites';
import Offer from './pages/offer/offer';
import PrivateRoute from './components/private-route/private-route';
import { Offer as OfferType } from './mocks/offer';
import { FavoriteOffer } from './mocks/favorites';

const AppPaths = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  
} as const

type AppProps = {
  offers: OfferType[]
  favoriteOffers: FavoriteOffer[]
}


const App = ({ offers, favoriteOffers }: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppPaths.Main}
        element={
          <MainPage
            offers={offers}
            offersCount={offers.length}
          />
        }
      />
      <Route
        path={AppPaths.Login}
        element={<Login />}
      />
      <Route
        path={AppPaths.Favorites}
        element={
          <PrivateRoute isAuthenticated={true}>
            <Favorites offers={favoriteOffers}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppPaths.Offer}
        element={<Offer />}
      />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>

);

export {
  App,
  AppPaths
}
