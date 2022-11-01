


import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, BackHandler } from 'react-native'
import {NavigationContainer, DarkTheme} from '@react-navigation/native'
import MainStackNavigator from './src/navigation/StackNavigator'
import {store, persistor} from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'


const App = () => {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    return true;
  };

  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={DarkTheme}
          >
          <StatusBar
            barStyle={'light-content'}
            animated
            backgroundColor={'#000000'}
          />
          <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
            <MainStackNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;

