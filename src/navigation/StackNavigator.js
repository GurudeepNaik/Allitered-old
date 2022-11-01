import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import IntroScreen from '../screens/IntroScreen'
import StartScreen from '../screens/StartScreen'
import EditScreen from '../screens/EditScreen'
import VerticalScroll from '../screens/VerticalScroll'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator();

const MainStackNavigator = props => {

  const [started] = useSelector(({ Events }) => [
    Events.started
  ])

  return(
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          opacity: 1,
        },
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
      initialRouteName={started? 'StartScreen': 'IntroScreen'}>
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="EditScreen"
          component={VerticalScroll}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
}

export default MainStackNavigator