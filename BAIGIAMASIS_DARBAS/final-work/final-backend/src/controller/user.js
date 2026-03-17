import UserModel from "../models/user.js";

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

const userNameValidation = (gotName) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    if (!gotName) {
        // empty
        return { name: "No user name", isValid: false };
    }

    if (/\d/.test(gotName)) {
        // is number
        return { name: "Bad user name (has numbers)", isValid: false };
    }

    if (gotName.length < 2) {
        // too short
        return { name: "Bad user name (too short)", isValid: false };
    }

    const formatedName = doCapitalLetter(gotName);

    return {
        name: formatedName,
        isValid: true,
    };
};

const emailValidation = (gotEmail) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    if (!gotEmail) {
        // empty
        return { email: "No email", isValid: false };
    }

    const splittedEmail = String(gotEmail).trim().split("@");
    if (splittedEmail.length !== 2) {
        // not @ or too many
        return { email: "Bad email (no @ or too many)", isValid: false };
    }

    if (!splittedEmail[0].length || !splittedEmail[1].length) {
        // no name ar server
        return { email: "Bad email (no name or server)", isValid: false };
    }

    if (!splittedEmail[1].includes(".")) {
        // no server dot
        return { email: "Bad email (bad server name)", isValid: false };
    }

    const splittedServer = splittedEmail[1].split(".");

    if (!splittedServer[0] || splittedServer[1].length < 2) {
        return {
            email: "Bad email (too short server name or extention)",
            isValid: false,
        };
    }

    const answer = (splittedEmail[0] + "@" + splittedEmail[1]).toLowerCase();
    return { email: answer, isValid: true };
};

const passwordValidation = (gotPassword, isNewUser) => {
    // answer is valid:
    // {formatedName, true} else {errorMessage, false}

    let password = "";

    if (!gotPassword) {
        // empty
        return { password: "No password", isValid: false };
    }

    password = String(gotPassword);

    if (isNewUser) {
        if (password.length < 6) {
            // too short
            return {
                password: "Weak password (too short)",
                isValid: false,
            };
        }

        if (password === password.toLowerCase()) {
            // no upper
            return {
                password: "Weak password (no one upper case letter)",
                isValid: false,
            };
        }

        if (password === password.toUpperCase()) {
            // no lower
            return {
                password: "Weak password (no one lower case letter)",
                isValid: false,
            };
        }

        if (!/\d/.test(password)) {
            // no digit
            return {
                password: "Weak password (no digital)",
                isValid: false,
            };
        }
    }
    return { password: password, isValid: true };
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
export const register = async (req, res) => {
    // check validation

    let resultObj = userNameValidation(req.body.userName);

    if (!resultObj.isValid) {
        return res.status(400).json({ message: resultObj.name });
    }

    const newName = resultObj.name;

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

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const user = new UserModel({
        id: uuid(),
        name: newName,

        email: email,
        avatar: req.body.avatarUrl,
        password: hash,
    });

    await user.save();

    console.log("Registracija6:");
    console.log(user);

    const newJwtToken = createToken(user, "2h");
    const newRefreshJwtToken = createToken(user, "24h");

    console.log("Registracija7:");
    console.log(user);

    return res.status(201).json({
        message: "New user created sucsesful",
        jwtToken: newJwtToken,
        jwtRefreshToken: newRefreshJwtToken,
        user: user,
    });
};

// ----------------------------------------------------------------------
export const login = async (req, res) => {
    let nameOrEmail = req.body.nameOrEmail;

    let user = {};

    user = await UserModel.findOne({ email: nameOrEmail });
    if (!user) {
        // can be name
        user = await UserModel.findOne({ name: nameOrEmail });
    }

    if (!user) {
        return res.status(404).json({
            message: "1Failed to login (bad email, user name or password)",
        });
    }

    const password = req.body.password;

    //                                      got pass    db pass (hash)
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
        return res.status(404).json({
            message: "2Failed to login (bad email, user name or password)",
        });
    }

    const newJwtToken = createToken(user, "2h");
    const newRefreshJwtToken = createToken(user, "24h");

    return res.status(200).json({
        message: "Login is sucsesful",
        jwtToken: newJwtToken,
        jwtRefreshToken: newRefreshJwtToken,
        user: user,
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
                    "()bad refreshToken or expired, " +
                    endErrMessage,
            });
        }

        //   good refresh token
        const newToken = createToken(decoded, "2h");

        return res.status(200).json({
            message: "Token is updated sucsesful",
            jwtToken: newToken,
            jwtRefreshToken: refreshToken,
        });
    });
};
