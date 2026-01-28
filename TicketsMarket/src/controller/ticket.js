import TicketModel from "../models/ticket.js";
import { v4 as uuid } from "uuid";
import { searchUserById } from "../controller/user.js";

const stringValidation = (gotString, messgeIfErr) => {
    // answer is valid:
    // {anser, true} else {errorMessage, false}

    if (!gotString) {
        // empty
        return { string: messgeIfErr, isValid: false };
    }
    return { string: gotString, isValid: true };
};

const priceValidation = (gotPrice) => {
    // answer is valid:
    // {anser, true} else {errorMessage, false}

    const resultObj = stringValidation(gotPrice, "No price");

    if (!resultObj.isValid) {
        return { string: "No price", isValid: false };
    }
    if (isNaN(gotPrice)) {
        // empty
        return { price: "Price is not a number", isValid: false };
    } else if (gotPrice <= 0) {
        // negative or zero
        return { price: "Price should be positive number", isValid: false };
    } else {
        const price = (Math.round(gotPrice * 100) / 100).toFixed(2);
        return { price: price, isValid: true };
    }
};

// active
export const addTicket = async (req, res) => {
    let resultObj = {};

    resultObj = searchUserById(res.params.userId);
    if (!resultObj.isValid) {
        // No user
        return res.status(404).json({ message: resultObj.errMessage });
    }
    const userId = resultObj.user.id;

    resultObj = stringValidation(req.body.title, "No title");

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const title = resultObj.string;

    resultObj = priceValidation(req.body.price);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const price = resultObj.string;

    resultObj = stringValidation(
        req.body.fromLocation,
        "The journey does not have a start location",
    );

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const fromLocation = resultObj.string;

    resultObj = stringValidation(
        req.body.toLocation,
        "The journey does not have a finish location",
    );

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const toLocation = resultObj.string;

    resultObj = stringValidation(
        req.body.toLocationPhotUrl,
        "No journey finish lovation image",
    );

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const toLocationPhotUrl = resultObj.string;

    //    id: { type: String, required: true },
    // title: { type: String, required: true },
    // userId: { type: String, required: true },
    // price: { type: Number, required: true },
    // fromLocation: { type: String, required: true },
    // toLocation: { type: String, required: true },
    // toLocationPhotUrl: { type: String, required: true },

    const Ticket = new TicketModel({
        id: uuid(),
        title: title,
        userId: userId,
        price: price,
        fromLocation: fromLocation,
        toLocation: toLocation,
        toLocationPhotUrl: toLocationPhotUrl,
    });
    await Ticket.save();

    return res.status(201).json({ Ticket: Ticket });
};

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
