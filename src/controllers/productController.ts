import { Request , Response } from "express";
import { Op } from 'sequelize';
import { Product } from '../models/product';

export const listProduct = async (req: Request , res: Response) => {
  try {
      let prod = await Product.findAll({
        where: { 
          [Op.or]: {
            title: {
              [Op.like]: req.params.search==undefined ? '%' : '%'+req.params.search+'%'
            },
            description: {
              [Op.like]: req.params.search==undefined ? '%' : '%'+req.params.search+'%'
            }
          } 
         }
      });
      res.json(prod);

  }catch(error){
    console.log('error' + error);
  }
}
export const getProduct = async (req: Request , res: Response) => {
  let { id } = req.params;
  try {
      let prod = await Product.findByPk(id);
      res.json(prod);
  }catch(error){
    console.log('error' + error);
  }
}

export const addProduct = async (req: Request , res: Response) => {
  let {id_user , title , description , value} = req.body;
  try {
      let newProduct = await Product.create({id_user , title , description , value});
      console.log(newProduct);
      res.json({id:newProduct.id , id_user , title , description , value});
      res.status(201);

  }catch(error){
    console.log('error' + error);
  }
}

export const upProduct = async (req: Request , res: Response) => {
  try {

    let results = await Product.findAll({
      where: {
        id:1
      }   
    });
    if(results.length > 0){
      let product = results[0];
      product.title = 'title Llalala';
      await product.save();
    }
      console.log("Product Updated");
      
  }catch(error){
    console.log('error' + error);
  }
}

export const RemoveProduct = async (req: Request , res: Response) => {
  try {
    let results = await Product.findAll({
      where: {
        id:2
      }   
    });
    if(results.length > 0){
      let product = results[0];
      
      await product.destroy();
    }
    console.log(`Item Removido!`);
    
  }catch(error){
    console.log('error' + error);
  }
}
