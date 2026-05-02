import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({ title, price, bgColor, image }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>

      <View style={styles.leftContent}>

        <Text style={styles.title}>{title}</Text>

        {price && (
          <Text style={styles.price}>{price}</Text>
        )}

        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

      </View>

      <Image source={image} style={styles.image} />

    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
  },

  leftContent: {
    flex: 1
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white"
  },

  price: {
    fontSize: 18,
    color: "white",
    marginTop: 10
  },

  arrowButton: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center"
  },

  arrow: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },

  image: {
    width: 160,
    height: 190,
    resizeMode: "contain"
  }
})
