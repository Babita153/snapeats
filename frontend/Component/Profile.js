import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

  const navigation = useNavigation();

  // 👇 Dynamic user data
  const [isEdit, setIsEdit] = useState(false);
  const [modalvisible, setModalvisible] = useState(false);
  const [user, setUser] = useState({
    name: "Babita",
    email: "babita@gmail.com",
    phone: "+91 9876543210",
    home: "Yamunanagar, Haryana",
    work: "Zirakpur, Chandigarh"
  });

  // 👇 Handle change
  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  // 👇 Save profile
  const handleSave = () => {
    setIsEdit(false);
    alert("Profile Updated ✅");
  };

  // 👇 Logout
  const handleLogout = () => {
    setModalvisible(false);
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Profile</Text>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/avatar.png")}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Text style={{ color: "white" }}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>

        {/* NAME */}
        <Text style={styles.label}>Full Name</Text>
        {
          isEdit ? (
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          ) : (
            <Text style={styles.value}>{user.name}</Text>
          )
        }

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        {
          isEdit ? (
            <TextInput
              style={styles.input}
              value={user.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          ) : (
            <Text style={styles.value}>{user.email}</Text>
          )
        }

        {/* PHONE */}
        <Text style={styles.label}>Phone</Text>
        {
          isEdit ? (
            <TextInput
              style={styles.input}
              value={user.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />
          ) : (
            <Text style={styles.value}>{user.phone}</Text>
          )
        }

        {/* HOME */}
        <Text style={styles.label}>Home Address</Text>
        {
          isEdit ? (
            <TextInput
              style={styles.input}
              value={user.home}
              onChangeText={(text) => handleChange("home", text)}
            />
          ) : (
            <Text style={styles.value}>{user.home}</Text>
          )
        }

        {/* WORK */}
        <Text style={styles.label}>Work Address</Text>
        {
          isEdit ? (
            <TextInput
              style={styles.input}
              value={user.work}
              onChangeText={(text) => handleChange("work", text)}
            />
          ) : (
            <Text style={styles.value}>{user.work}</Text>
          )
        }

      </View>

      {/* BUTTONS */}

      {
        isEdit ? (
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEdit(true)}
          >
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
        )
      }

      <TouchableOpacity style={styles.button} onPress={() => setModalvisible(!modalvisible)} >
        <Text style={styles.btnText}>
          Log Out
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalvisible}
        animationType="fade"
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>

            <Text style={styles.modalTitle}>Log out</Text>

            <Text style={styles.modalText}>
              Are you sure you want to {"\n"}log out?
            </Text>

            <View style={styles.modalbutton}>

              {/* CLOSE */}
              <TouchableOpacity
                style={styles.modalBtnBox}
                onPress={() => setModalvisible(false)}
              >
                <Text style={styles.modalBtnText}>Close</Text>
              </TouchableOpacity>

              {/* OKAY */}
              <TouchableOpacity
                style={styles.modalBtnBox}
                onPress={handleLogout}
              >
                <Text style={styles.modalBtnText}>Okay</Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 130,
    backgroundColor: "#f4a261",
    padding: 6,
    borderRadius: 20
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },

  label: {
    color: "gray",
    marginTop: 10
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 5
  },

  button: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
  ,
  logouttext: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: "100%",
    color: 'blue',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  modalView: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  modalText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    marginBottom: 20
  },

  modalbutton: {
    flexDirection: "row",
    width: "90%",
  },

  modalBtnBox: {
    flex: 1,
    backgroundColor: "orange",
    padding: 12,
    alignItems: "center",
  },

  modalBtnText: {
    color: "#fff",
    fontWeight: "bold"
  },
});