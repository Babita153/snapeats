import { enableScreens } from 'react-native-screens';
enableScreens();
import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FirstPage from './Component/FirstPage';
import One from './Component/One';
import Two from './Component/Two';
import Started from './Component/Started';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Tabs from './BottomTabs/Tabs';

import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <CartProvider>
    <OrderProvider>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FirstPage" component={FirstPage}/>
          <Stack.Screen name="One" component={One}/> 
          <Stack.Screen name="Two" component={Two}/> 
          <Stack.Screen name="Started" component={Started}/>
          <Stack.Screen name="Login" component={Login}/> 
          <Stack.Screen name="SignUp" component={SignUp}/>  
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>

    </OrderProvider>
    </CartProvider>

  )
}

export default App;

const styles = StyleSheet.create({})