import express from "express";
import {
    addTicket,
    getAllTickets,
    getTicketByUserId,
} from "../controller/ticket.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/tickets", auth, addTicket);

router.get("/userTickets", auth, getTicketByUserId);

router.get("/tickets", auth, getAllTickets);

export default router;
