import express from "express";
import cors from "cors";
import { v4 as uniqueID } from "uuid";

const app = express();
app.use(express.json());
app.use(cors());

// Task4
// app.get("/town", (req, res) => {
//     const town = {
//         name: "Ignaliana",
//         temperature: "-18",
//     };
//     res.json({ town });
// });

// Task5, 6, 8
app.get("/ID", (req, res) => {
    const userID = uniqueID();
    console.log(userID);
    res.json({ userID });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
