import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import './index.css';

import App from './App';
import reducer from './reducers';

let store = createStore(reducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

//registerServiceWorker();
