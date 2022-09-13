import { Request , Response } from 'express';
import { Op } from 'sequelize';
import { Product } from '../models/product';
import sharp from 'sharp';

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
    res.json({error:'Error'})
  }
    console.log("Product Updated");
}

export const deleteProduct = async (req: Request , res: Response) => {
  let { id } = req.body;

  await Product.destroy({where: { id }});
  res.json({})
}


export const uploadImages = async (req: Request , res: Response) => {
  // console.log( req.files );
  if(req.file) {
    await sharp(req.file.path)
        .resize(400,600)
        .toFormat('jpeg')
        .toFile(`./public/media/${req.file.filename}.jpg`);
    
    console.log({ image: `localhost:4000/public/media/${req.file.filename}.jpg`});
  } else {
      res.status(400);
      res.json({error : 'Arquivo Invalido'});
  }

  res.json({});
}
