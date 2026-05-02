import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// API
import API from "../services/api";
import { getToken } from "../services/firebase";

export default function Order() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();

        const res = await API.get("/order/my", {
          headers: {
            Authorization: token,
          },
        });

        setOrders(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 FORMAT DATE
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>My Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>No Orders Yet 🛒</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

            <View style={styles.card}>

              {/* 🔥 HEADER */}
              <View style={styles.rowBetween}>
                <Text style={styles.orderId}>
                  Order #{item._id.slice(-5)}
                </Text>

                <Text style={styles.status}>
                  {item.status || "Pending"}
                </Text>
              </View>

              {/* 🔥 ITEMS */}
              <Text style={styles.items}>
                {item.items.map(i => i.name).join(", ")}
              </Text>

              {/* 🔥 INFO */}
              <View style={styles.rowBetween}>
                <Text style={styles.qty}>
                  {item.items.length} Items
                </Text>

                <Text style={styles.total}>
                  ₹{item.total}
                </Text>
              </View>

              {/* 🔥 DATE */}
              <Text style={styles.date}>
                {formatDate(item.createdAt)}
              </Text>

            </View>

          )}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "gray"
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  orderId: {
    fontWeight: "bold",
    fontSize: 14
  },

  status: {
    color: "orange",
    fontWeight: "bold"
  },

  items: {
    marginVertical: 8,
    color: "#555"
  },

  qty: {
    color: "gray"
  },

  total: {
    fontWeight: "bold",
    fontSize: 16
  },

  date: {
    marginTop: 5,
    fontSize: 12,
    color: "gray"
  }
});