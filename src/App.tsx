import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/main';
import NotFound from './pages/not-found/not-found';
import Login from './pages/login/login';
import Favorites from './pages/favorites/favorites';
import Offer from './pages/offer/offer';
import PrivateRoute from './components/private-route/private-route';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchQuestionAction } from './store/api-actions';
import { AppDispatch } from './store';
import { RootState } from './store';


const AppPaths = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',

} as const


const App = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchQuestionAction())

  }, [dispatch])

  const currentOffers = useSelector((state: RootState) => state.offers)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppPaths.Main}
          element={
            <MainPage
              offers={currentOffers}
              offersCount={currentOffers.length}
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
              <Favorites offers={[]} />
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
  )
}

export {
  App,
  AppPaths
}
