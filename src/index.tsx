import React from 'react';
import './index.css';
import {App} from './app_and_store/App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app_and_store/Store';

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

serviceWorker.unregister();