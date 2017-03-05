
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'

var React = require('react');
var ReactDOM = require('react-dom');

var Main = require('./main');

let store = createStore(reducer)

ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>,
  	document.getElementById('app')
);