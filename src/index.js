import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './store/reducers/index'
import App from './App';

const store = createStore(reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(                                                
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)