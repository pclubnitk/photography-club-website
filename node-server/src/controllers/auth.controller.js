import { getGoogleClient } from "../config/google.js";
import { generateToken } from "../utils/jwt.js"

export const googleLogin = async (req, res) => {

    try {
        const client = getGoogleClient();
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Google token is required(ps: check at which level is the token being sent in the json response."
            })
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            sub,
            name,
            email,
            picture,
            email_verified,
        } = payload;

        if (!email_verified) {
            return res.status(401).json({
                success: false,
                message: "Email not verified",
            });
        }

        const isNitk = email.endsWith("@nitk.edu.in");

        const jwt = generateToken({
            googleId: sub,
            email,
            role: "user",
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: jwt,
            user: {
                googleId: sub,
                name,
                email,
                picture,
                isNitk,
            },
        });
    }
    catch (err) {
        console.error(err);

        res.status(401).json({
            success: false,
            message: "Invalid Google Token",
        });
    }
};

export const getCurrentUser = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
        message: "Current User API",
    });
};

export const logout = async (req, res) => {
    res.json({
        success: true,
        message: "Logout API",
    });
};