import express from "express";
import {
    getAllTickets,
    getTicketById,
    addTicket,
    updateTicketById,
    deleteTicketById,
} from "../controller/Ticket.js";

import auth from "../middleware/auth.js";

const router = express.Router();
// active
router.post("/Tickets/:userId", auth, addTicket);

router.get("/Tickets", auth, getAllTickets);

router.get("/Tickets/:id", auth, getTicketById);

router.post("/Tickets", auth, addTicket);

router.put("/Tickets/:id", auth, updateTicketById);

router.delete("/Tickets/:id", auth, deleteTicketById);

export default router;
