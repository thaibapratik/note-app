import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const requiresAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            throw createHttpError(401, "User not authenticated");
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach userId to the request object
        req.userId = decoded.id;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        next(error); // Pass error to your error-handling middleware
    }
};
