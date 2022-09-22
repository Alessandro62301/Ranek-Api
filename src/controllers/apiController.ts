import { Request , Response } from "express";



export const validadeToken = (req: Request , res: Response) => {
  res.json({status: true});
}


