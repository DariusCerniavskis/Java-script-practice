import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";
import { v4 as uuid } from "uuid";
import { searchUserById, moneyValidation, doCapitalLetter } from "./user.js";

const hasCapitalLetter = true;

const stringValidation = (gotString, messgeIfErr, isCapitalLetter) => {
    // answer is valid:
    // {anser, true} else {errorMessage, false}

    if (!gotString) {
        // empty
        return { string: messgeIfErr, isValid: false };
    }
    const answer = isCapitalLetter ? doCapitalLetter(gotString) : gotString;
    return { string: answer, isValid: true };
};

// const priceValidation = (gotPrice) => {
//     // answer is valid:
//     // {anser, true} else {errorMessage, false}

//     const resultObj = stringValidation(gotPrice, "No price");

//     if (!resultObj.isValid) {
//         return { string: "No price", isValid: false };
//     }
//     if (isNaN(gotPrice)) {
//         // empty
//         return { price: "Price is not a number", isValid: false };
//     } else if (gotPrice <= 0) {
//         // negative or zero
//         return { price: "Price should be positive number", isValid: false };
//     } else {
//         const price = (Math.round(gotPrice * 100) / 100).toFixed(2);
//         return { price: price, isValid: true };
//     }
// };

// active
export const addQuestion = async (req, res) => {
    let resultObj = {};

    resultObj = await searchUserById(req.body.userId);

    if (!resultObj.isValid) {
        // No user

        return res.status(404).json({ message: resultObj.errMessage });
    }

    const user = resultObj.user;

    resultObj = stringValidation(req.body.title, "No title", !hasCapitalLetter);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const title = resultObj.string;

    resultObj = moneyValidation(req.body.price, "Bad ticket price or no price");

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.money });
    }
    const price = resultObj.money;

    resultObj = stringValidation(
        req.body.fromLocation,
        "The journey does not have a start location",
        hasCapitalLetter,
    );

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const fromLocation = resultObj.string;

    resultObj = stringValidation(
        req.body.toLocation,
        "The journey does not have a finish location",
        hasCapitalLetter,
    );

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const toLocation = resultObj.string;

    resultObj = stringValidation(
        req.body.toLocationPhotoUrl,
        "No journey finish location image",
        !hasCapitalLetter,
    );

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.string });
    }
    const toLocationPhotoUrl = resultObj.string;

    // Check money balanse after buy
    if (price > user.moneyBalance) {
        return res
            .status(400)
            .json({ message: "Not enough money to buy a ticket" });
    }

    const newBalance = user.moneyBalance - price;

    //    id: { type: String, required: true },
    // title: { type: String, required: true },
    // userId: { type: String, required: true },
    // price: { type: Number, required: true },
    // fromLocation: { type: String, required: true },
    // toLocation: { type: String, required: true },
    // toLocationPhotoUrl: { type: String, required: true },

    const ticket = new QuestionModel({
        id: uuid(),
        title: title,
        userId: user.id,
        price: price,
        fromLocation: fromLocation,
        toLocation: toLocation,
        toLocationPhotoUrl: toLocationPhotoUrl,
    });
    await ticket.save();

    // const updatedUser = await UserModel.findOneAndUpdate(
    //     { id: id },
    //     { ...req.body },
    //     { new: true },
    //   );

    // update Uuser balance
    const updatedUser = await UserModel.findOneAndUpdate(
        { id: user.id },
        {
            $set: { moneyBalance: newBalance },
            $push: { tickets: ticket.id },
        },
        { new: true }, // returns updated document
    );

    const showUserAfterBuying = {
        name: updatedUser.name,
        surname: updatedUser.surname,
        moneyBalance: updatedUser.moneyBalance,
        tckets: updatedUser.tickets,
    };

    return res
        .status(201)
        .json({ ticket: ticket, userAfterBuying: showUserAfterBuying });
};

export const getAllTickets = async (req, res) => {
    const tickets = await QuestionModel.find();

    return res.json({ tickets: tickets });
};

export const getTicketByUserId = async (req, res) => {
    const resultObj = await searchUserById(req.body.userId);

    if (!resultObj.isValid) {
        return res.status(404).json({ message: resultObj.errMessage });
    }

    const user = resultObj.user;

    const tickets = await QuestionModel.find();

    const userTickets = [...tickets].filter((ticket) => {
        return ticket.userId === user.id;
    });

    return res.json({ activeUser: user, userTickets: userTickets });
};
