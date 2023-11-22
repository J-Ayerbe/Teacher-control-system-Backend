import { NextFunction, Request, Response } from "express";


 const checkRole=(authorizedRoles)=> async (req, res: Response, next: NextFunction) => {
    const { role } = req;
    if (authorizedRoles.includes(role)) {
        return next();
    }
    return res.status(403).json({ message: "Unauthorized" });
 }

 export default checkRole
