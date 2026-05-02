import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from "../Component/HomeScreen"
import Search from "../Component/Search"
import Cart from "../Component/Cart"
import Order from "../Component/Order"
import Profile from "../Component/Profile"

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar
      }}
    >

      <Tab.Screen style={{tintColor: "black"}}
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.icon}
              source={require("../assets/home.png")}
            />
          )
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.icon}
              source={require("../assets/search.png")}
            />
          )
        }}
      />

      <Tab.Screen
        name="My Order"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={require("../assets/cart.png")}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={require("../assets/user.png")}
            />
          )
        }}
      />
      
    </Tab.Navigator>
  );
}

export default Tabs;

const styles = StyleSheet.create({

  tabBar: {
    height: 60,
    width: "80%",
    borderRadius: 50,
    backgroundColor: "white",
    position: 'absolute',
    bottom: 26,
    alignSelf: "center",
    marginLeft: "10%",
  },

  icon: {
    height: 26,
    width: 26,
    tintColor: "black",
    padding:10
  }

});
