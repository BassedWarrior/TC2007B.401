const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  exposedHeaders: ['X-Total-Count'],
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.json());

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);

app.get('/', (req, res) => {
  res.send("This is the backend URI")
});

app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`));
