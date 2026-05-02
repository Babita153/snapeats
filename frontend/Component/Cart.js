import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// CONTEXTS
import { OrderContext } from "../context/OrderContext";
import { CartContext } from "../context/CartContext";

// API
import API from "../services/api";
import { getToken } from "../services/firebase";

const Cart = ({ closeCart }) => {

  const { addOrder } = useContext(OrderContext);
  const { cart, setCart } = useContext(CartContext);

  const [showSuccess, setShowSuccess] = useState(false);

  // 🔥 CALCULATIONS
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = cart.length > 0 ? 50 : 0;
  const total = subtotal - discount;

  // 🔥 INCREASE QUANTITY
  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
  };

  // 🔥 DECREASE QUANTITY
  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    setCart(updated);
  };

  // 🔥 PLACE ORDER
  const placeOrder = async () => {
    try {
      const token = await getToken();

      const res = await API.post(
        "/order",
        {
          items: cart,
          total: total,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      addOrder(cart, total);

      setCart([]);
      setShowSuccess(true);

    } catch (error) {
      console.log(error);
      alert("Order failed ❌");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔥 HEADER WITH CLOSE */}
      <View style={styles.header}>
        <TouchableOpacity onPress={closeCart}>
          <Text style={styles.backBtn}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Your Cart</Text>
      </View>

      {cart.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Cart is empty 🛒
        </Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>₹{item.price}</Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity onPress={() => decreaseQty(item._id)}>
                    <Text style={styles.qtyBtn}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qty}>{item.quantity}</Text>

                  <TouchableOpacity onPress={() => increaseQty(item._id)}>
                    <Text style={styles.qtyBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <View style={styles.totalBox}>
          <Text>Subtotal: ₹{subtotal}</Text>
          <Text>Discount: ₹{discount}</Text>
          <Text style={styles.total}>Total: ₹{total}</Text>

          <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
            <Text style={styles.orderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SUCCESS MODAL */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.successCard}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              🎉 Order Placed!
            </Text>

            <TouchableOpacity onPress={() => {
              setShowSuccess(false);
              closeCart(); // 🔥 auto close after success
            }}>
              <Text style={{ marginTop: 10, color: "orange" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  backBtn: {
    fontSize: 22,
    marginRight: 10
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },

  name: {
    fontWeight: "bold"
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },

  qtyBtn: {
    fontSize: 18,
    backgroundColor: "orange",
    color: "#fff",
    width: 25,
    textAlign: "center",
    borderRadius: 5
  },

  qty: {
    marginHorizontal: 10
  },

  totalBox: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10
  },

  total: {
    fontWeight: "bold",
    marginTop: 5
  },

  orderButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center"
  },

  orderText: {
    color: "#fff",
    fontWeight: "bold"
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  successCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  }
});