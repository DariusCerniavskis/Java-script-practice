import express from "express";
import cors from "cors";
import { v4 as uniqueID } from "uuid";
import casual from "casual";

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
// app.get("/ID", (req, res) => {
//     // const userID = uniqueID();
//     // console.log(userID);
//     // res.json({ userID });

// });

// // Task 9
app.get("/fakeuser", (req, res) => {
    const userInfo = {
        country: casual.country,
        city: casual.city,
        firstName: casual.first_name,
        LastName: casual.last_name,
        phone: casual.phone,
        timeZone: casual.timezone,
    };
    console.log(userInfo);
    res.json(userInfo);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
