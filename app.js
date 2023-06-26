const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/companyRoutes");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use("/uploads", express.static("uploads"));
app.use(cors("*"));

app.use('/api/company' , companyRoutes)

module.exports = app;
