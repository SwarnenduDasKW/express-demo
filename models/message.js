const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomid: { type: String, required: true },
  roomname: { type: String, required: true },
  roomadmin: { type: String, required: true },
  isactive: { type: Boolean, required: false },
  visible: { type: Boolean, required: false },
  lastmsgrcvd: { type: String, required: false },
  lastmsgrcvdtimestamp: { type: String, required: false },
});

module.exports = mongoose.model("rooms", messageSchema);
