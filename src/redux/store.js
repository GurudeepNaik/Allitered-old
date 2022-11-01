import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import middlewares from './middleware';
import events from './reducers/events';
import Reducers from './reducers'

export const rootReducer = combineReducers(Reducers);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'], // uncomment this line if you want to use persist for navigation
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(...middlewares),
);
const persistor = persistStore(store);

export {store, persistor};
