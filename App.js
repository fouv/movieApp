import React from 'react';
import { StyleSheet} from 'react-native';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';
import { getPersistor, getStore } from './Store/configureStore'
import { PersistGate } from 'redux-persist/integration/react';

export default class App extends React.Component {
  render() {
    const myStore = getStore();  
   const myPersistor = getPersistor();
    return (
      <Provider store={myStore}>
        <PersistGate 
        persistor={myPersistor}        >
        <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
