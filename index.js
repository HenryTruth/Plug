/* eslint-disable prettier/prettier */
/**
 * @format
 */
import React from 'react';
import axios from 'axios';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import authReducer from './App/redux/reducer/auth';
import navReducer from './App/redux/reducer/navigation';
import chatReducer from './App/redux/reducer/chats';
import profileReducer from './App/redux/reducer/profile';
import generalReducer from './App/redux/reducer/generalReducer';
import messageReducer from './App/redux/reducer/message';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import {store} from './index';
// import { persistor } from './index';


// Alternative solution
// const getAsyncStorage = async () => {
//   axios.defaults.headers.common.Authorization =  await AsyncStorage.getItem('token');
// };

// getAsyncStorage();



axios.defaults.headers.common.Authorization = AsyncStorage.getItem('token').then((result) => {
  return result;
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
};


export const rootReducer = combineReducers({
  messageReducer:persistReducer(persistConfig, messageReducer),
  authReducer: persistReducer(persistConfig, authReducer),
  navReducer: navReducer,
  chatReducer: chatReducer,
  profileReducer:profileReducer,
  generalReducer: generalReducer,
});


// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);



const appUseRedux = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  );
};

AppRegistry.registerComponent(appName, () => appUseRedux);
