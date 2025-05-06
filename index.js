const express = require("express");
const connectToMongoDB = require("./connect");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8000;

// database connection
connectToMongoDB("mongodb://localhost:27017/short-url");

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
})
