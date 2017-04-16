import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import storeFactory from './store';
// AppContainer is a necessary wrapper component for HMR
import {AppContainer} from 'react-hot-loader';
import Routes from './routes';
import * as sampleDate from './initialState.json';

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleDate;

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState());


const store = storeFactory(initialState);
store.subscribe(saveState);
window.store = store;

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Routes />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};


render();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./routes', () => {
        render()
    });
}