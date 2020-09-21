require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connection_url = process.env.DATABASE_URL;
//"mongodb+srv://admin:U5yB4FviGnxCQiPA@cluster0.bymor.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("db.on - error: ", error));
db.once("open", () => console.error("db.once: connected to database"));

app.use(express.json());

const msgRouter = require("./routes/messages");
app.use("/messages", msgRouter);

app.listen(3000, () => console.log("Server Started"));
