import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Index from './index';

import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducer/auth';

const root = combineReducers({
  user: authReducer,
})

const store = createStore(root, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Index />
    </Provider>
  );
}

