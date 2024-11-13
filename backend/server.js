const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const path = require("path");

const port = process.env.PORT;

connectDB();

const app = express();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/artwork", require("./routes/artworkRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));

app.use(express.static(path.join(__dirname, "../frontend/build")));
