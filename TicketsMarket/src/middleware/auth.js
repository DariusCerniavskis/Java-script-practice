import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    const token = req.headers.authorization;
    const errorMessage="Bad authorisation, please try again or login"

    if (!token) {
        return res.status(401).json({ message: errorMessage });
    }

    jwt.verify(token, process.env.JWT_RANDOMISER, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: errorMessage });
        }

        req.body = req.body || {};
        req.body.userId = decoded.userId;

        next();
    });
};

export default authUser;
