import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={configureStore()}>
    <React.Fragment>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);

serviceWorker.register();
