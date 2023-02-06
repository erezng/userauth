import express from "express";
import { notFound } from "./middleware/not-found.js";

import morgan from "morgan";
import { connect } from "./controllers/connect.js";

const app = express();
connect().catch((e) => console.log(e));
app.use(express.json());
app.use(morgan("dev"));

app.get("/home", (req, res) => {
  res.json({ message: "Home page" });
});

app.use(notFound);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running!");
});
