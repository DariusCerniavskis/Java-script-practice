// win11
import express from "express";
import elementsRouter from "./src/router/estate.js";
import mongoose from "mongoose";
import "dotenv/config";
import dns from "node:dns";

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
dns.setServers(["8.8.8.8", "1.1.1.1"]);




mongoose
    .connect(process.env.MONGO_DB_CONNECTION, { family: 4 })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));



app.use(elementsRouter);

// const uniqueID = uID();

app.use((req, res) => {
    res.status(404).json({ message: "This endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost: ${process.env.PORT}`);
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on http://localhost: ${process.env.PORT}`);
// });
