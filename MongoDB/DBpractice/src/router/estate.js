import express from "express";
import {
    getAllEstates,
    getEstateById,
    addEstate,
    updateEstateById,
    deleteEstateById,
} from "../controler/esatate.js";

const router = express.Router();

router.get("/estate", getAllEstates);

router.get("/estate/:id", getEstateById);

router.post("/estate", addEstate);

router.put("/estate/:id", updateEstateById);

router.delete("/estate/:id", deleteEstateById);

export default router;
