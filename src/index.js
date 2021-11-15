import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as nearAPI from 'near-api-js'

import reducers from './store/reducers/index'
import App from './App';

const store = createStore(reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const config = {
    networkId: "testnet",
    contractName: "book-tracker-contract.testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
}

const initContract = async() => {

    const nearConfig = config;
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    const near = await nearAPI.connect({ keyStore, ...nearConfig});
    const walletConnection = new nearAPI.WalletConnection(near);

    //userData
    let currentUser;
    if (walletConnection.getAccountId()) {
        currentUser = {
            accountId: walletConnection.getAccountId,
            balance: (await walletConnection.account().state()).amount
        }
    }

    const contract = await new nearAPI.Contract(
        walletConnection.account(),
        config.contractName,
        {
            viewMethods: ['get_book', 'get_books'],
            changeMethods: ['add_book', 'update_book', 'delete_book' ],
            sender: walletConnection.getAccountId()
        }
    )

    return { contract, currentUser, nearConfig, walletConnection }
}


ReactDOM.render(                                                
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)