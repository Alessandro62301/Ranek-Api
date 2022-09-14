import { unlink } from 'fs/promises';
import { Request , Response } from 'express';
import { Op, where } from 'sequelize';
import { Product } from '../models/product';
import { Image } from '../models/image';
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

export const getUserProducts = async (req: Request , res: Response) => {    
    let prod = await Product.findAll({
      attributes: {exclude: ['id_user']},
      where: {
        id_user: res.locals.user.id
      },
    });
    res.json(prod);   
}

export const addProduct = async (req: Request , res: Response) => {

if( res.locals.user.id && req.body.title && req.body.description && req.body.value ) {
  let {title , description , value} = req.body;

  let newProduct = await Product.create({id_user: res.locals.user.id , title , description , value});

  res.status(201);
  res.json({id:newProduct.id , is_user: res.locals.user.id , title , description , value});
  }else {
    res.json({ error: 'Preencha os Campos' });
  } 
}

export const updateProduct = async (req: Request , res: Response) => {
  let { id ,title , description , value} = req.body;

  let results = await Product.findOne({
    where: {
      id: id,
      id_user: res.locals.user.id
    }
  });
  if(results){
    results.title = title;
    results.description = description;
    results.value = value;
    await results.save();
    res.status(201);
    res.json({status: true});
  }else{
    res.json({error:'Error'})
  }
    console.log("Product Updated");
}

export const deleteProduct = async (req: Request , res: Response) => {
  let { id } = req.body;
  const status = await Product.destroy({
    where: {
      id: id,
      id_user: res.locals.user.id
    }
  });
  res.json({status})
}

export const uploadImages = async (req: Request , res: Response) => {

  let result = await Product.findByPk(req.body.id_product);

    if(req.file && result) {

      const filename = `${req.file.filename}.jpg`;
      
      let newProduct = await Image.create({id_product: req.body.id_product  , name : filename});
      console.log({id:newProduct.id , id_product: newProduct.id_product, name: newProduct.name});

      await sharp(req.file.path)
          .resize(400,600)
          .toFormat('jpeg')
          .toFile(`./public/media/${filename}`);
      
      await unlink(req.file.path);
  
      res.json({ image: `localhost:4000/public/media/${filename}`});
    } else {
        res.status(400);
        res.json({error : 'Arquivo Invalido'});
    }
}
