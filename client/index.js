import React from 'react'
import ReactDOM from 'react-dom';
import { Home } from './containers/Home'


ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
	document.getElementById('root')
);