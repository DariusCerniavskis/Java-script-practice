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
            const formatedName = doCapitalLetter(splittedName[0]);
            const formatedSurname = doCapitalLetter(splittedName[1]);

            return {
                name: formatedName,
                isValid: true,
                surname: formatedSurname,
            };
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
            // not @ or too many
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

const passwordValidatoion = (gotPassword) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    if (!gotPassword) {
        // empty
        return { password: "No password", isValid: false };
    } else {
        const password = String(gotPassword);
        if (password.length < 6) {
            // too short
            return { email: "Weak password (too short)", isValid: false };
        } else if (password === password.toLowerCase) {
            // no upper
            return {
                password: "Weak password (no uppercase letter)",
                isValid: false,
            };
        } else if (password === password.toUpperCase) {
            // no lower
            return {
                password: "Weak password (no lowercase letter)",
                isValid: false,
            };
        } else if (/\d/.test(password)) {
            // no digit
            return { password: "Weak password (no digital)", isValid: false };
        } else {
            // strong
            return { password: password, isValid: true };
        }
    }
};

const createToken = (user, validTime) => {
    const newToken = jwt.sign(
        { email: user.email, userId: user.id },
        process.env.JWT_RANDOMISER,
        { expiresIn: validTime },
    );

    return newToken;
};

export const searchUserById = async (id) => {
    const user = await UserModel.findOne({ id: id });

    if (!user) {
        return { errMessage: `No user with id: ${id}`, isValid: false };
    }

    return { user: user, isValid: true };
};

export const createNewUser = async (req, res) => {
    let userName = {};
    let email = "";
    let password = "";

    // check validation
    let resultObj = userNameVlidatoion(req.body.name);

    if (!resultObj[1]) {
        return res.status(400).json({ message: resultObj[0] });
    }
    userName = { name: resultObj[0], surname: resultObj[2] };

    resultObj = emailValidatoion(req.body.email);

    if (!resultObj[1]) {
        return res.status(400).json({ message: resultObj[0] });
    }
    email = resultObj[0];

    resultObj = passwordValidatoion(req.body.password);

    if (!resultObj[1]) {
        return res.status(400).json({ message: resultObj[0] });
    }
    password = resultObj[0];

    if (req.body.monyBalace <= 0) {
        return res.status(400).json({ message: "You do not have money" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new UserModel({
        id: uuid(),
        ...userName,

        email: email,
        password: hash,
        moneyBalance: req.body.monyBalace,
        Tickets: [],
    });
    await user.save();

    return res.status(201).json({ message: "New user created sucsesful" });
};

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return res
            .status(404)
            .json({ message: "Failed to login (bad email or password)" });
    }

    //                                      got pass    db pass (hash)
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
        return res
            .status(404)
            .json({ message: "Failed to login (bad email or password)" });
    }

    const newJvtToken = createToken(user, "2h");
    const newRefreshJvtToken = createToken(user, "24h");

    return res.status(200).json({
        message: "Login is sucsesful",
        jvtToken: newJvtToken,
        jvtRefreshToken: newRefreshJvtToken,
    });
};

export const newToken = (req, res) => {
    const refreshToken = req.body.jvtRefreshToken;
    const errMessage = "Bad jvtToken refreshing";
    const endErrMessage = "please try again or login";

    if (!refreshToken) {
        return res.status(400).json({
            message: errMessage + "(no refresh token), " + endErrMessage,
        });
    }

    jwt.verify(refreshToken, process.env.JWT_RANDOMISER, (error, decoded) => {
        if (error) {
            return res.status(400).json({
                message:
                    errMessage +
                    "(bad refreshToken or expired), " +
                    endErrMessage,
            });
        }

        //   good refresh token
        const newToken = createToken(decoded, "2h");

        return res.status(200).json({
            message: "Login is sucsesful",
            jvtToken: newToken,
            jvtRefreshToken: refreshToken,
        });
    });
};

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    const sortedUsers = [...users].sort((a, b) => {
        return a.surname.localeCompare(b.surname);
    });

    return res.json({ users: sortedUsers });
};

export const getUserById = async (req, res) => {
    const resultObj = await searchUserById(req.params.id);

    if (!resultObj.isValid) {
        return res.status(404).json({ message: resultObj.errMessage });
    }

    return res.json({ user: resultObj.user });
};

export const buyTicket = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findOne({ id: id });

    if (!user) {
        return res.status(404).json({ message: `No user with id: ${id}` });
    }
};
