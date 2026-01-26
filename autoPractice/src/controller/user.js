import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

export const createNewUser = async (req, res) => {
    const data = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    const user = new UserModel({
        id: uuid(),
        ...data,
        password: hash,
        cars: [],
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
