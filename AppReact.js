
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

var React = require('react');
var ReactDOM = require('react-dom');

var Main = require('./js/main');

// const store = createStore(reducer)

ReactDOM.render(
	<Main />,
  	document.getElementById('app')
);