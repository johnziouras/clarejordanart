const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use("/images", require("./routes/imageRoutes"));

app.listen(port, () => console.log(`server started on port ${port}`));
