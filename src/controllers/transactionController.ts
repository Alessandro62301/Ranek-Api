import { Request , Response } from "express";
import { Transaction } from '../models/transaction';
import { soldProduct } from "./productController";
import dotenv from 'dotenv';


dotenv.config();


export const listTransaction = async (req: Request , res: Response) => {
    let transactions = await Transaction.findAll();
    res.json(transactions);
}

export const addTransaction = async (req: Request , res: Response) => {
    let {id_seller , id_product} = req.body;
    let id_buyer = res.locals.user.id;

    let newTransaction = await Transaction.create({id_seller,id_buyer,id_product})
    .then(async()=>{
        await soldProduct(id_product);
    })

    res.json(newTransaction)
}
