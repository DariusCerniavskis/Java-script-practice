

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Route: Get first 100 elements (default)
app.get("/data", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;

    const response = await axios.post(
      process.env.MONGO_API_URL,
      {
        limit: limit
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.MONGO_API_KEY
        }
      }
    );

    res.json({
      count: response.data.documents.length,
      data: response.data.documents
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data from MongoDB" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});