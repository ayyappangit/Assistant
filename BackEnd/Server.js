const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors());
const controller = require("./Controller/Assist");
app.use("/assistant", controller);
app.listen(port, function() {
  console.log("Server running on port number:", port, "");
});
