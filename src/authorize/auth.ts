import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    userData?: { [key: string]: any }; 
}

const secretKey = 'MyBrand';

export const middleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Check if the cookie named 'token' exists
        if (!req.cookies || !req.cookies.token) {
            throw new Error('Token not found');
        }

        // Extract the token from the cookie
        const token = req.cookies.token;

        // Verify and decode the token
        const decodedToken = jwt.verify(token, secretKey) as { [key: string]: any };
        console.log(decodedToken, "Decoded token");

        // Attach the decoded token data to the request object
        req.userData = decodedToken;

        // Move to the next middleware
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        const errorMessage = error instanceof Error ? error.message : "Authentication failed";
        res.status(401).json({
            error: "Unauthorized",
            message: errorMessage
        });
    }
};
