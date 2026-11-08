import ReactDOM from 'react-dom/client';
import { App } from './App';
import { offersMock } from './mocks/offer';
import { favoriteOffersMock } from './mocks/favorites';
import { Provider } from 'react-redux';
import { offersStore } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={offersStore}>
    <App
      offers={offersMock}
      favoriteOffers={favoriteOffersMock}
    />
  </Provider>
);
