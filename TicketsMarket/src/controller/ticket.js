import TicketModel from "../models/ticket.js";
import { v4 as uuid } from "uuid";

const titleValidation = (gotTtile) =>{
    // answer is valid:
    // {anser, true} else {errorMessage, false}
 
    if(!gotTtile){
        // empty
        return { name: "No ticket title", isValid: false }; 

    }
    return {title:gotTtile,isValid:true}
}


// active
export const addTicket = async (req, res) => {
     
    let resultObj = titleValidation(req.body.title);

    if (!resultObj[1]) {
        return res.status(400).json({ message: resultObj[0] });
    }
    title=resultObj[0] 
    
    

    // title: { type: String, required: true },
// price: { type: Number, required: true },
// fromLocation: { type: String, required: true },
// toLocation: { type: String, required: true },
// toLocationPhotUrl: { type: String, required: true },
    
    const Ticket = new TicketModel({ id: uuid(), ...req.body });
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
