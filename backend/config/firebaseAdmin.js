import admin from "firebase-admin";
import fs from "fs";

// 🔥 Read JSON manually
const serviceAccount = JSON.parse(
  fs.readFileSync("./config/serviceAccountKey.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;