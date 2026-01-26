import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const doCapitalLetter = (word) => {
    const formatedWord = String(word).trim();

    if (formatedWord.length > 1) {
        return formatedWord[0].toUpperCase + formatedWord.slice(1).toLowerCase;
    } else if (formatedWord.length == 1) {
        return formatedWord[0].toUpperCase;
    } else {
        return "";
    }
};

const userNameVlidatoion = (gotName) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    if (!gotName) {
        // empty
        return { name: "No user name", isValid: false };
    } else {
        const splittedName = String(gotName).split(" ");
        if (splittedName.length !== 2) {
            // not Name Surname
            return {
                name: "Bad user name (NOT consist of name and surname)",
                isValid: false,
            };
        } else if (!isNaN(splittedName[0]) || !isNaN(splittedName[1])) {
            // is number
            return { name: "Bad user name (has numbers)", isValid: false };
        } else if (splittedName[0].length < 2 || splittedName[1].length < 2) {
            // too short
            return { name: "Bad user name (too short)", isValid: false };
        } else {
            const answer =
                doCapitalLetter(splittedName[0]) +
                " " +
                doCapitalLetter(splittedName[1]);
            return { name: answer, isValid: true };
        }
    }
};

const emailValidatoion = (gotEmail) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    if (!gotEmail) {
        // empty
        return { email: "No email", isValid: false };
    } else {
        const splittedEmail = String(gotEmail).trim().split("@");
        if (splittedEmail.length !== 2) {
            // not Name Surname
            return { email: "Bad email (no @ or too many)", isValid: false };
        } else if (!splittedEmail[0].length || !splittedEmail[1].length) {
            // no name ar server
            return { email: "Bad email (no name or server)", isValid: false };
        } else if (!splittedEmail[1].includes(".")) {
            // no server dot
            return { email: "Bad email (bad server name)", isValid: false };
        } else {
            const answer = (splittedEmail[0] + "@" + splittedEmail[1])
                .toLowerCase;
            return { email: answer, isValid: true };
        }
    }
};

export const createNewUser = async (req, res) => {
    const data = req.body;

    // check validation
    let resultObj = userNameVlidatoion(req.body.name);

    if (!resultObj[1]) {
        return res.status(406).json({ message: resultObj[0] });
    }

    resultObj = emailValidatoion(req.body.email);

    if (!resultObj[1]) {
        return res.status(406).json({ message: resultObj[0] });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    const user = new UserModel({
        id: uuid(),
        ...data,
        password: hash,
        Tickets: [],
    });
    await user.save();

    return res.status(201).json({ user: user });
};

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return res.status(401).json({ message: "Bad email" });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Bad password" });
    }

    const token = jwt.sign(
        { email: user.email, userId: user.id },
        process.env.JWT_RANDOMISER,
        { expiresIn: "12h" },
    );

    return res.status(200).json({ jwt: token });
};
