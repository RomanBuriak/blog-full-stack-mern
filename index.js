import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

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

app.post("/auth/login", loginValidation, UserController.login);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
//app.delete("/posts", PostController.remove);
//app.patch("/posts", PostController.update);

app.listen(1234, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
