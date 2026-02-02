import UserModel from "../models/user.js";
import TicketModel from "../models/ticket.js";

import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

export const doCapitalLetter = (word) => {
    const formatedWord = String(word).trim();

    let answer = "";

    if (formatedWord.length > 1) {
        answer =
            formatedWord[0].toUpperCase() + formatedWord.slice(1).toLowerCase();
    } else if (formatedWord.length == 1) {
        answer = formatedWord[0].toUpperCase();
    }

    return answer;
};

const userNameVlidation = (gotName, gotSurname) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    if (!gotName || !gotSurname) {
        // empty
        return { name: "No user name or surname", isValid: false };
    } else {
        if (/\d/.test(gotName + gotSurname)) {
            // is number
            return { name: "Bad user name (has numbers)", isValid: false };
        } else if (gotName.length < 2 || gotSurname.length < 2) {
            // too short
            return { name: "Bad user name (too short)", isValid: false };
        } else {
            const formatedName = doCapitalLetter(gotName);
            const formatedSurname = doCapitalLetter(gotSurname);

            return {
                name: formatedName,
                isValid: true,
                surname: formatedSurname,
            };
        }
    }
};

const emailValidation = (gotEmail) => {
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
            const splittedServer = splittedEmail[1].split(".");

            if (!splittedServer[0] || splittedServer[1].length < 2) {
                return {
                    email: "Bad email (too short server name or extention)",
                    isValid: false,
                };
            } else {
                const answer = (
                    splittedEmail[0] +
                    "@" +
                    splittedEmail[1]
                ).toLowerCase();
                return { email: answer, isValid: true };
            }
        }
    }
};

const passwordValidation = (gotPassword, isNewUser) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    let password = "";

    if (!gotPassword) {
        // empty
        return { password: "No password", isValid: false };
    } else {
        password = String(gotPassword);

        if (isNewUser) {
            if (password.length < 6) {
                // too short
                return {
                    password: "Weak password (too short)",
                    isValid: false,
                };
            } else if (password === password.toLowerCase()) {
                // no upper
                return {
                    password: "Weak password (no one upper case letter)",
                    isValid: false,
                };
            } else if (password === password.toUpperCase()) {
                // no lower
                return {
                    password: "Weak password (no one lower case letter)",
                    isValid: false,
                };
            } else if (!/\d/.test(password)) {
                // no digit
                return {
                    password: "Weak password (no digital)",
                    isValid: false,
                };
            }
        }
    }
    return { password: password, isValid: true };
};

export const moneyValidation = (gotMoney, errMessage) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    const money = Number(gotMoney);

    if (money > 0) {
        // good
        const formatedMoney = (Math.round(money * 100) / 100).toFixed(2);
        return { money: formatedMoney, isValid: true };
    } else {
        // empty
        return {
            money: errMessage,
            isValid: false,
        };
    }
};

// CREATE NEW TOKEN
// ----------------------------------------------------------------

const createToken = (user, validTime) => {
    const newToken = jwt.sign(
        { email: user.email, userId: user.id },
        process.env.JWT_RANDOMISER,
        { expiresIn: validTime },
    );

    return newToken;
};

// -----------------------------------------------------------------
export const searchUserById = async (id) => {
    if (!id) {
        return { errMessage: `No user ID`, isValid: false };
    }

    const user = await UserModel.findOne({ id: id });

    if (!user) {
        return { errMessage: `No user with id: ${id}`, isValid: false };
    }

    return { user: user, isValid: true };
};

// ------------------------------------------------------------------
export const createNewUser = async (req, res) => {
    // check validation
    let resultObj = userNameVlidation(req.body.name, req.body.surname);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.name });
    }

    const userName = { name: resultObj.name, surname: resultObj.surname };

    resultObj = emailValidation(req.body.email);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.email });
    }
    const email = resultObj.email;

    ((resultObj = passwordValidation(req.body.password)), false);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.password });
    }
    const password = resultObj.password;

    resultObj = moneyValidation(
        req.body.moneyBalance,
        "Bad money balance or not money",
    );
    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.money });
    }

    const moneyBalance = resultObj.money;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new UserModel({
        id: uuid(),
        ...userName,

        email: email,
        password: hash,
        moneyBalance: moneyBalance,
        tickets: [],
    });
    await user.save();

    return res.status(201).json({ message: "New user created sucsesful" });
};

// ----------------------------------------------------------------------
export const login = async (req, res) => {
    let resultObj = {};

    resultObj = emailValidation(req.body.email);
    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.email });
    }
    const email = resultObj.email;

    resultObj = passwordValidation(req.body.password);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.password });
    }
    const password = resultObj.password;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        return res
            .status(404)
            .json({ message: "1Failed to login (bad email or password)" });
    }

    //                                      got pass    db pass (hash)
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
        return res
            .status(404)
            .json({ message: "2Failed to login (bad email or password)" });
    }

    const newJvtToken = createToken(user, "2h");
    const newRefreshJvtToken = createToken(user, "24h");

    return res.status(200).json({
        message: "Login is sucsesful",
        jvtToken: newJvtToken,
        jvtRefreshToken: newRefreshJvtToken,
    });
};

// -----------------------------------------------------------------
export const newToken = (req, res) => {
    let refreshToken = "";

    const errMessage = "Bad jvtToken refreshing";
    const endErrMessage = "please try again or login";

    try {
        refreshToken = req.body.jvtRefreshToken;
    } catch {
        return res.status(400).json({
            message: "No refresh token",
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
            message: "Token is updated sucsesful",
            jvtToken: newToken,
            jvtRefreshToken: refreshToken,
        });
    });
};

// ----------------------------------------------------------------
export const getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    const sortedUsers = [...users].sort((a, b) => {
        return a.surname.localeCompare(b.surname);
    });

    return res.json({ users: sortedUsers });
};

// ----------------------------------------------------------------
export const getUserById = async (req, res) => {
    const resultObj = await searchUserById(req.body.userId);

    if (!resultObj.isValid) {
        return res.status(404).json({ message: resultObj.errMessage });
    }

    return res.json({ user: resultObj.user });
};

// ----------------------------------------------------------------
export const addMoney = async (req, res) => {
    let resultObj = {};

    resultObj = await searchUserById(req.body.userId);

    if (!resultObj.isValid) {
        return res.status(404).json({ message: resultObj.errMessage });
    }

    const user = resultObj.user;

    resultObj = moneyValidation(req.body.addMoney, "Bad sum or no money");
    if (!resultObj.isValid) {
        return res.status(404).json({ message: resultObj.money });
    }

    const newBalance = +user.moneyBalance + +resultObj.money;

    const updatedUser = await UserModel.findOneAndUpdate(
        { id: user.id },
        {
            $set: { moneyBalance: newBalance },
        },
        { new: true }, // returns updated document
    );

    const showNewBAlance = {
        name: updatedUser.name,
        surname: updatedUser.surname,
        moneyBalance: updatedUser.moneyBalance,
    };

    return res.status(201).json({ newBalance: showNewBAlance });
};

export const getAllUsersDetailed = async (req, res) => {
    const users = await UserModel.find();

    const sortedUsers = [...users].sort((a, b) => {
        return a.surname.localeCompare(b.surname);
    });

    const tickets = await TicketModel.find();

    const UsersAndTickets = [...sortedUsers].map((user) => {
        const userTickets = [...tickets].reduce((acc, curr) => {
            return curr.userId == user.id ? [...acc, curr] : acc;
        }, []);

        return {
            user: user,
            tickets: userTickets,
        };
    });

    return res.json({ usersDetailed: UsersAndTickets });
};
