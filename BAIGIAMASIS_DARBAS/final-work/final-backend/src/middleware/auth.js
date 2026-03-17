import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    console.log("Startassssssss");

    const authHeader = req.headers["authorization"];

    const errorMessage = "Bad authorisation, please try again or login";

    if (!authHeader) {
        return res.status(401).json({ message: "No token for authorisation" });
    }

    const token = authHeader;
    // const token = authHeader.split(" ")[1]; // Bearer <token>

    console.log("Header");
    console.log(authHeader);
    console.log("token");
    console.log(token);

    jwt.verify(token, process.env.JWT_RANDOMISER, (err, decoded) => {
        if (err) {
            console.log("Validation error");

            return res.status(401).json({ message: errorMessage });
        }

        console.log("Validation OK");

        req.body = req.body || {};
        req.body.userId = decoded.userId;

        next();
    });
};

export default auth;
