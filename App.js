import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Index from './index';

import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducer/auth';
import postsReducer from './store/reducer/posts';

const root = combineReducers({
  user: authReducer,
  posts: postsReducer
});

const store = createStore(root, applyMiddleware(ReduxThunk));

import { LogBox} from 'react-native';
LogBox.ignoreWarnings(['Setting a timer']);

const App = () => {
  
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Index />
    </Provider>
  );
}

// export  { db, auth, provider, storage } ;
export default App;