import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Food = mongoose.model("Food", foodSchema);

export default Food;