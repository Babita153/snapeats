import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const One = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>

      {/* Image */}
      <Image
        source={require("../assets/food1.png")}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>Effortless & Reliable {'\n'}food delivery</Text>

      {/* Description */}
      <Text style={styles.description}>
        Welcome to our food delivery app!{'\n'}Experience the convenience of real-time order {'\n'}tracking at your fingertips. 
      </Text>

      {/* Indicator Dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Two")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default One;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  image: {
    width: 300,
    height: 230,
    resizeMode: "contain",
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color:"black",
    marginBottom: 10,
  },

  description: {
    textAlign: "center",
    color: "gray",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  dotsContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#FF6B00",
    width: 18,
  },

  button: {
    backgroundColor: "#FF6B00",
    width: "90%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})
