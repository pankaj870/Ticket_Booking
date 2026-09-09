const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const route = require("./routes/route");
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`server is running on : https://localhost:${PORT}/api/`);
});

module.exports = app;
