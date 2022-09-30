import { Product } from './../models/product';
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
    let {id_product} = req.body;
    let id_buyer = res.locals.user.id;

    let product = await Product.findByPk(id_product);

    if(product && id_buyer != product.id_user){
        let newTransaction = await Transaction.create({id_seller: product.id_user, id_buyer, id_product})
        .then(async()=>{
            await soldProduct(id_product);
        })
    
        res.status(201)
    res.json(newTransaction)
    } else {
        res.status(400)
        res.json({status: false})
    }
   
}
