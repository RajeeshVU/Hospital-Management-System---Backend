import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    menu: [
      {
        name: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
  },
  { collection: "MenuDB", timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
