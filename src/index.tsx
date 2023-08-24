import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AddContact from './components/contacts/AddContact';
import Contacts from './components/contacts/Contacts';
import ContactDetails from './components/contacts/ContactDetails';
import ChartsMaps from './components/charts-maps/ChartsMaps';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/contacts'} />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'addContact',
        element: <AddContact />,
      },
      {
        path: 'contacts/:contactId',
        element: <ContactDetails />,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <AddContact />,
      },
      {
        path: 'charts-maps',
        element: <ChartsMaps />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Redux Store Setup */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
