import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController";

mongoose
  .connect(
    "mongodb+srv://roman:vBgprUrmDiwAsIRb@cluster0.zvm6s.mongodb.net/blogS?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Glory to Ukraine!");
});

app.post("/auth/register", registerValidation, UserController.register);

app.post("/auth/login", UserController.login);

app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(1234, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
