import TicketModel from "../models/ticket.js";
import { v4 as uuid } from "uuid";

export const getAllTickets = async (req, res) => {
    const Tickets = await TicketModel.find();

    return res.json({ Tickets: Tickets });
};

export const getTicketById = async (req, res) => {
    const id = req.params.id;
    const Ticket = await TicketModel.findOne({ id: id });

    if (!Ticket) {
        return res.status(404).json({ message: `No Ticket with id: ${id}` });
    }

    return res.json({ Ticket: Ticket });
};

export const insertTicket = async (req, res) => {
    const Ticket = new TicketModel({ id: uuid(), ...req.body });
    await Ticket.save();

    return res.status(201).json({ Ticket: Ticket });
};

export const updateTicketById = async (req, res) => {
    const id = req.params.id;

    const Ticket = await TicketModel.findOneAndUpdate(
        { id: id },
        { ...req.body },
        { new: true },
    );

    if (!Ticket) {
        return res.status(404).json({ message: `No Ticket with id: ${id}` });
    }

    return res.status(200).json({ Ticket: Ticket });
};

export const deleteTicketById = async (req, res) => {
    const id = req.params.id;
    const Ticket = await TicketModel.findOneAndDelete({ id: id });

    if (!Ticket) {
        return res.status(404).json({ message: `No Ticket with id: ${id}` });
    }

    return res.status(200).json({ Ticket: Ticket });
};
