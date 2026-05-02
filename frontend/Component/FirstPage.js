import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const FirstPage = () => {

  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('One')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('One')}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
        />
        <Text style={styles.title}>SnapEats</Text>
        <Text style={styles.subtitle}>Food Delivered Fast</Text>
      </TouchableOpacity>

    </View>
  )
}

export default FirstPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },

  image: {
    width: "40%",
    height: "30%",
    resizeMode: "contain",
    alignSelf:"center",
    alignContent:"center",
    marginTop:"80%",
  }
})