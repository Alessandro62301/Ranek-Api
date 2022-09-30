import { Request, Response, NextFunction } from "express"
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;
        let user;

        if (req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer') {
                try {
                    user = JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );
                    res.locals.user = user;
                    success = true;
                } catch (err) {
                    console.log('Jwt Invalido');
                }
            }
        }
        if (success) {
            console.log('Autorizado');
            // res.json({ status: true});
            next();
        } else {
            res.status(403) // Not Authorized
            res.json({ error: 'Nao autorizado' });
        }

    }
}

