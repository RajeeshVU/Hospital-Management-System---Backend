import mongoose from "mongoose";
import Menu from '../permissions/menuEntity.js'
const userSchema = new mongoose.Schema(
  {
    userId: { type: String },
    username: { type: String, required: true },
    phone: { type: Number },
    password: { type: String, required: true },
    role: { type: String, default: "User" },
    email: { type: String, required: true, unique: true },
    menuId: {
      type: mongoose.Types.ObjectId,
      ref: Menu,
      default: null,
    },
  },
  { collection: "UserDB", timestamps: true }
);

export default mongoose.model("User", userSchema);
