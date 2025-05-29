import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
dotenv.config();
const app = express();

app.use(ratelimiter);
app.use(express.json());

const Port = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("its working");
});

app.get("/health", (req, res) => {
  res.send("it's Working");
});

app.use("/api/transactions", transactionsRoute);
initDB().then(() => {
  app.listen(5001, () => {
    console.log(Port, "serverse is running ");
  });
});
