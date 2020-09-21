const express = require("express");
const router = express.Router();
const Message = require("../models/message");

//get
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one
router.get("/:id", getMessage, async (req, res) => {
  res.send(res.message);
});

//post
router.post("/", async (req, res) => {
  const message = new Message({
    roomid: req.body.roomid,
    roomname: req.body.roomname,
    roomadmin: req.body.roomadmin,
  });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//patch/put
router.patch("/:id", getMessage, async (req, res) => {
  if (req.body.roomid != null) {
    res.message.roomid = req.body.roomid;
  }
  if (req.body.roomname != null) {
    res.message.roomname = req.body.roomname;
  }
  if (req.body.roomadmin != null) {
    res.message.roomadmin = req.body.roomadmin;
  }
  try {
    const updatedMessage = await res.message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete
router.delete("/:id", getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.status(200).json({ message: "Deleted Message" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMessage(req, res, next) {
  let message;
  try {
    message = await Message.findOne({ roomid: req.params.id });
    if (message == null) {
      return res.status(404).json({ message: "Cannot find message" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.message = message;
  next();
}

module.exports = router;
