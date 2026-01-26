import express from "express";
import ticketsRouter from "./src/router/ticket.js";
import userRouter from "./src/router/user.js";
import mongoose from "mongoose";
import "dotenv/config";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

mongoose
    // .connect("mongodb+srv://Darius:Darius123@cluster0.yfejvyx.mongodb.net/")
    // .then(() => console.log("Connected to DB"))
    // .catch((err) => {
    //     console.log(err);
    // });

    .connect(process.env.MONGO_DB_CONNECTION)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());

app.use(ticketsRouter);
app.use(userRouter);

app.use((req, res) => {
    res.status(404).json({ message: "This endpoint does not exist" });
});

// http://localhost:3000

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
