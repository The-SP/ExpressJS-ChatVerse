const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = require("./room")

const chatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
        type: String,
        default: "Anonymous",
    },
    room: { type: Schema.Types.ObjectId, ref: "Room"}
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;