import { verifyToken } from "../utils/jwt.js";

export const verifyJWT = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1];

        const decodedToken = verifyToken(token);

        req.user = decodedToken;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }
};