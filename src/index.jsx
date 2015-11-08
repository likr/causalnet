/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin"

import App from './components/app'

import dataReducer from './reducers/data-reducer'

injectTapEventPlugin();


const reducer = combineReducers({
  data: dataReducer
});

const store = applyMiddleware(thunk)(createStore)(reducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('content'));
