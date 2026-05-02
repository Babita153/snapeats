import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import CategoryCard from "./CategoryCard";
import { SafeAreaView } from 'react-native-safe-area-context';

import Cart from "../Component/Cart";

// 🔥 API + CONTEXT
import API from "../services/api";
import { CartContext } from "../context/CartContext";

const HomeScreen = () => {

  const [selected, setSelected] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [foods, setFoods] = useState([]);

  const { addToCart } = useContext(CartContext);

  // 🔥 FETCH FOOD FROM BACKEND
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get("/food");
        setFoods(res.data);
      } catch (error) {
        console.log("Error fetching food:", error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
        <View>
          <Text style={styles.location}>DELIVER TO</Text>
          <Text style={styles.city}>Gurgaon</Text>
        </View>

        <TouchableOpacity onPress={() => setShowCart(true)}>
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../assets/cartbag.png")}
          />
        </TouchableOpacity>
      </View>

      {/* CART MODAL */}
      <Modal visible={showCart} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Cart closeCart={() => setShowCart(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TOP BANNER */}
        <CategoryCard
          title="SUMMER COMBO"
          price="$10.88"
          bgColor="#d93c04"
          image={require("../assets/burger-one.png")}
        />

        {/* 🔥 FOOD LIST FROM BACKEND */}
        <View style={styles.rowBetween}>
          <Text style={styles.section}>Popular Items</Text>
        </View>

        <FlatList
          data={foods}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.foodCard}>

              <Image source={{ uri: item.image }} style={styles.foodImg} />

              <Text style={styles.foodName}>{item.name}</Text>

              <Text style={styles.rating}>
                ⭐ 4.5 • Fast food
              </Text>

              <Text style={styles.price}>₹{item.price}</Text>

              {/* 🔥 ADD TO CART */}
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addText}>Add to Cart +</Text>
              </TouchableOpacity>

            </View>
          )}
        />

        {/* EXTRA UI */}
        <CategoryCard
          title="BURGERS"
          bgColor="#f39c12"
          image={require("../assets/burger-two.png")}
        />

        <CategoryCard
          title="PIZZA"
          bgColor="#0b5345"
          image={require("../assets/pizza-one.png")}
        />

        <CategoryCard
          title="BURRITO"
          bgColor="#e65100"
          image={require("../assets/buritto.png")}
        />

      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  location: {
    fontSize: 12,
    color: "gray"
  },

  city: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15
  },

  section: {
    fontSize: 18,
    fontWeight: "bold"
  },

  foodCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 16,
    marginBottom: 30,
    width: 200,
    padding: 10
  },

  foodImg: {
    width: "100%",
    height: 150,
    borderRadius: 10
  },

  foodName: {
    fontWeight: "bold",
    marginTop: 5
  },

  rating: {
    color: "gray"
  },

  price: {
    fontWeight: "bold",
    marginTop: 5
  },

  addBtn: {
    marginTop: 8,
    backgroundColor: "orange",
    padding: 8,
    borderRadius: 10,
    alignItems: "center"
  },

  addText: {
    color: "#fff",
    fontWeight: "bold"
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
});