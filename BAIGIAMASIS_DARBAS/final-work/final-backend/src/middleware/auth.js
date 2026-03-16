import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    console.log("Startassssssss");

    const authHeader = req.headers["authorization"];

    console.log(authHeader);
    const errorMessage = "Bad authorisation, please try again or login";

    if (!authHeader) {
        return res.status(401).json({ message: "No token for authorisation" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

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
