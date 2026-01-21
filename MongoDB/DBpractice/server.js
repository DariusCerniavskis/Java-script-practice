// win11
import express from "express";
import elementsRouter from "./src/router/estate.js";
import mongoose from "mongoose";
import "dotenv/config";
// import { v4 as uID } from "uuid";
// import dns from "dns";

// win7
// const express = require("express");
// const elementsRouter = require("./src/router/car.js");
// const mongoose = require("mongoose");
// const uID = require("uuid");
// const dotenv = require("dotenv/config");

const app = express();

app.use(express.json());

// dns.resolveSrv("_mongodb._tcp.cluster0.yfejvyx.mongodb.net", console.log);
const uri =
    "mongodb://Darius:Darius123@" +
    "ac-nmp0pzv-shard-00-00.yfejvyx.mongodb.net:27017," +
    "ac-nmp0pzv-shard-00-01.yfejvyx.mongodb.net:27017," +
    "ac-nmp0pzv-shard-00-02.yfejvyx.mongodb.net:27017/myDB" +
    "?ssl=true&replicaSet=atlas-nmp0pzv-shard-0&authSource=admin&retryWrites=true&w=majority";

// const uri =
//     "mongodb+srv://Darius:Darius123@cluster0.yfejvyx.mongodb.net/myDB?retryWrites=true&w=majority";

mongoose
    .connect(uri, { family: 4 })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// const uri =
//     "mongodb+srv://Darius:Darius123@cluster0.yfejvyx.mongodb.net/myDB?retryWrites=true&w=majority";

// mongoose
//     .connect(uri)
//     .then(() => {
//         console.log("✅ MongoDB connected");
//     })
//     .catch((err) => {
//         console.error("❌ MongoDB connection error:", err);
//     });

// mongoose
//     .connect(
//         "mongodb://Darius:Darius123@cluster0-shard-00-00.yfejvyx.mongodb.net:27017,cluster0-shard-00-01.yfejvyx.mongodb.net:27017,cluster0-shard-00-02.yfejvyx.mongodb.net:27017/myDB?ssl=true&authSource=admin&retryWrites=true&w=majority",
//     )
//     .then(() => console.log("Connected to DB"))
//     .catch((err) => {
//         console.log("Jungimosi klaida");
//         console.log(err);
//     });

// mongoose
//     .connect(process.env.MONGO_DB_CONNECTION_STRING)
//     .then(() => console.log("Connected to DB"))
//     .catch((err) => console.log(err));

app.use(elementsRouter);

// const uniqueID = uID();

app.use((req, res) => {
    res.status(404).json({ message: "This endpoint does not exist" });
});

app.listen(3010, () => {
    console.log(`Server is running on http://localhost: ${4501}`);
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on http://localhost: ${process.env.PORT}`);
// });
