import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import toggleFavorite from './Reducers/favoriteReducer';
import { AsyncStorage } from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}; 
const persistedReducer = persistReducer(persistConfig, toggleFavorite);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};
export {
    getStore,
    getState,
    getPersistor
};
export default {
    getStore,
    getState,
    getPersistor
}
