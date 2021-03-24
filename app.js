const express = require("express");
const app = express();

const ticketRoutes = require("./routes/tickets");

app.use(express.static("client/build"));

app.use("/api/tickets", ticketRoutes);

module.exports = app;
