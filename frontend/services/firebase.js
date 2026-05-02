import auth from "@react-native-firebase/auth";

export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const registerUser = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const getToken = async () => {
  const user = auth().currentUser;
  return await user.getIdToken();
};