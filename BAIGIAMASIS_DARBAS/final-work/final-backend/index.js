import "dotenv/config";
import express from "express";

import userRouter from "./src/router/user.js";
import mongoose from "mongoose";
import "dotenv/config";
import dns from "node:dns";
import cors from "cors";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const frontendPort = process.env.FRONTEND_PORT || 3000;

app.use(
    cors({
        origin: `http://localhost:${frontendPort}`,
        credentials: true,
    }),
);

console.log("frontendas portas " + frontendPort);

mongoose

    .connect(process.env.MONGO_DB_CONNECTION)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use(userRouter);

app.use((req, res) => {
    res.status(404).json({ message: "This endpoint does not exist" });
});

// http://localhost:3000

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
