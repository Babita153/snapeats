import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const foodData = [
  {
    id: "1",
    name: "Paneer Tikka Wrap",
    price: "23.99",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
  },
  {
    id: "2",
    name: "Mexican Burrito Bowl",
    price: "26.49",
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    price: "25.99",
    image: "https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
  },
  {
    id: "4",
    name: "Spicy Chicken Sandwich",
    price: "24.99",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046751.png"
  },
  {
    id: "5",
    name: "Pepperoni Pizza",
    price: "29.99",
    image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
  },
  {
    id: "6",
    name: "Veg Pizza",
    price: "28.99",
    image: "https://cdn-icons-png.flaticon.com/512/6978/6978255.png"
  },
  {
    id: "7",
    name: "Chicken Burger",
    price: "21.99",
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
  },
  {
    id: "8",
    name: "French Fries",
    price: "12.99",
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075975.png"
  },
  {
    id: "9",
    name: "Veg Sandwich",
    price: "19.99",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046751.png"
  },
  {
    id: "10",
    name: "Chicken Pizza",
    price: "31.99",
    image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
  }
];

const Search = () => {

  const [search, setSearch] = useState("");

  const filteredFood = foodData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>

      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.title}>{item.name}</Text>

      <Text style={styles.price}>From ${item.price}</Text>

      <TouchableOpacity>
        <Text style={styles.cart}>Add to Cart +</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.heading}>Find your favorite food</Text>

      <TextInput
        placeholder="Search Input"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.filter}>Filter</Text>

      <FlatList
        data={filteredFood}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  filter: {
    color: "gray",
    marginBottom: 10
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    elevation: 3
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 10
  },

  title: {
    fontWeight: "bold",
    textAlign: "center"
  },

  price: {
    color: "gray",
    marginVertical: 5
  },

  cart: {
    color: "orange",
    fontWeight: "bold"
  }

});
