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

export const updateProduct = async (req: Request , res: Response) => {
  let { id ,title , description , value} = req.body;

  let results = await Product.findByPk(id);
  if(results){
    results.title = title;
    results.description = description;
    results.value = value;
      await results.save();
  }else{
    res.json({error:'frase nao encontrada'})
  }
    console.log("Product Updated");
}

export const deleteProduct = async (req: Request , res: Response) => {
  let { id } = req.body;

  await Product.destroy({where: { id }});
  res.json({})
}


export const uploadImages = async (req: Request , res: Response) => {
  console.log( req.files );
  

  res.json({});
}
