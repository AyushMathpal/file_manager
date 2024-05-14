import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect.js";
import cors from "cors";
import upload from "./middleware/multer.js";
import { login, logout, signup } from "./controllers/AuthController/Auth.js";
import cookieParser from "cookie-parser";
import {
  createFile,
  createFolder,
} from "./controllers/FolderController/HandleCreate.js";
import { fetchFiles } from "./controllers/FolderController/HandleFetch.js";
import { deleteFile, deleteFolder } from "./controllers/FolderController/HandleDelete.js";
import { move, rename } from "./controllers/FolderController/HandleUpdate.js";
// import { auth } from "./middleware/Authmiddleware.js";
const app = express();

 dotenv.config();
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(cookieParser())
app.use(express.static("uploads"));
connectDB();

app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/logout",logout);

//CREATE
app.post("/api/create-folder", createFolder);
app.post("/api/create-file", upload.single("file"),createFile);

//READ
app.get("/api/fetch-files/:profileId", fetchFiles);

//UPDATE
app.put("/api/rename",rename)
app.post("/api/move",move)

//DELETE
app.post("/api/delete-file",deleteFile)
app.post("/api/delete-folder",deleteFolder)

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on file-manager-backend-vert.vercel.app:${process.env.PORT}`);
});
