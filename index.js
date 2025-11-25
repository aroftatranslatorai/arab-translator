const express = require("express");
const cors = require("cors");
const path = require("path");

// API handlers (ESM compatibility)
const shorof = require("./api/shorof.js");
const translate = require("./api/translate.js");
const harakat = require("./api/harakat.js");
const correct = require("./api/correct.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
  res.send("Server berjalan dengan baik");
});

app.all("/api/shorof", shorof);

app.all("/api/translate", (req, res) => {
  translate.default(req, res);
});

app.all("/api/harakat", (req, res) => {
  harakat.default(req, res);
});

app.all("/api/correct", (req, res) => {
  correct.default(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
