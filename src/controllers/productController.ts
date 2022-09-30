import { Transaction } from './../models/transaction';
import { ImageInstance } from './../models/image';
import { unlink } from 'fs/promises';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Product } from '../models/product';
import { Image } from '../models/image';
import sharp from 'sharp';

type item = {
  id: number;
  id_user: number,
  title: string,
  description: string,
  value: number,
  images: Array<ImageInstance>,
};

export const listProduct = async (req: Request, res: Response) => {

  let arrayProduct: item[] = [];

  let products = await Product.findAll({
    where: {
      [Op.or]: {
        title: {
          [Op.like]: req.params.search == undefined ? '%' : '%' + req.params.search + '%'
        },
        description: {
          [Op.like]: req.params.search == undefined ? '%' : '%' + req.params.search + '%'
        }
      },
      [Op.or]: {
        sold: {
          [Op.not]: 1
        },
      }
    },
  });

  products.forEach(async (elem) => {

    let image = await Image.findAll({
      attributes: { exclude: ['id_product'] },
      where: { id_product: elem.id },
    });

    arrayProduct.push({
      id: elem.id,
      id_user: elem.id_user,
      title: elem.title,
      description: elem.description,
      value: elem.value,
      images: image
    })
  })

  let get = setInterval(() => {
    if (arrayProduct.length === products.length) {
      res.json(arrayProduct);
      clearInterval(get);
    }
  }, 10)
}

export const getProduct = async (req: Request, res: Response) => {
  let { id } = req.params;
  let prod = await Product.findByPk(id);
  res.json(prod);
}

export const getUserProducts = async (req: Request, res: Response) => {
  let prod = await Product.findAll({
    attributes: { exclude: ['id_user'] },
    where: {
      id_user: res.locals.user.id
    },
  });
  res.json(prod);
}

export const addProduct = async (req: Request, res: Response) => {

  if (res.locals.user.id && req.body.title && req.body.description && req.body.value) {
    let { title, description, value } = req.body;

    let newProduct = await Product.create({ id_user: res.locals.user.id, title, description, value, sold: 0 });

    res.status(201);
    res.json({ id: newProduct.id, id_user: res.locals.user.id, title, description, value, sold: newProduct.sold });
  } else {
    res.json({ error: 'Preencha os Campos' });
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  let { id, title, description, value } = req.body;

  let results = await Product.findOne({
    where: {
      id: id,
      id_user: res.locals.user.id
    }
  });
  if (results) {
    results.title = title;
    results.description = description;
    results.value = value;
    await results.save();
    res.status(201);
    res.json({ status: true });
  } else {
    res.json({ error: 'Error' })
  }
  console.log("Product Updated");
}

export const deleteProduct = async (req: Request, res: Response) => {
  let { id } = req.body;
  const status = await Product.destroy({
    where: {
      id: id,
      id_user: res.locals.user.id
    }
  });
  res.json({ status })
}

export const uploadImage = async (req: Request, res: Response) => {

  let result = await Product.findByPk(req.body.id_product);

  if (req.file && result) {

    const filename = `${req.file.filename}.jpg`;

    let newProduct = await Image.create({ id_product: req.body.id_product, name: filename });
    console.log({ id: newProduct.id, id_product: newProduct.id_product, name: newProduct.name });

    await sharp(req.file.path)
      .resize(400, 600)
      .toFormat('jpeg')
      .toFile(`./public/media/${filename}`);

    await unlink(req.file.path);

    res.json({ image: `localhost:4000/public/media/${filename}` });
  } else {
    res.status(400);
    res.json({ error: 'Arquivo Invalido' });
  }
}

export const uploadImages = async (req: Request, res: Response) => {
  var myfiles = JSON.parse(JSON.stringify(req.files))

  let result = await Product.findByPk(req.body.id_product);

  if (myfiles && result) {
    myfiles.forEach(async (item: Express.Multer.File) => {

      const filename = `${item.filename}.jpg`;

      let newProduct = await Image.create({ id_product: req.body.id_product, name: filename });
      console.log({ id: newProduct.id, id_product: newProduct.id_product, name: newProduct.name });

      await sharp(item.path)
        .resize(400, 600)
        .toFormat('jpeg')
        .toFile(`./public/media/${filename}`);

      await unlink(item.path);

    })
    res.json(myfiles);
  } else {
    res.status(400);
    res.json({ error: 'Arquivo Invalido' });
  }
}

export const soldProduct = async (id: number) => {

  let results = await Product.findOne({
    where: { id: id, }
  });
  if (results) {
    results.sold = 1;
    await results.save();
  }
  console.log("Product Sold");
}

export const listSoldProduct = async (req: Request, res: Response) => {

  let results = await Product.findAll({
    where: {
      id_user: res.locals.user.id,
      sold: 1
    }
  });

  res.json(results)
}

export const listBoughtProduct = async (req: Request, res: Response) => {

  let results = await Transaction.findAll({
    where: {
      id_buyer: res.locals.user.id,
    }
  });

  let array: number[] = [];

  results.forEach(async (elem) => {
    array.push(elem.id_product);
  })

  listProductArrayId(array, res);
}

const listProductArrayId = async (arrayIds: number[], res: Response) => {

  let arrayProduct: item[] = [];

  let products = await Product.findAll({
    where: {
      id: {
        [Op.in]: arrayIds
      }
    }
  });

  products.forEach(async (elem) => {

    let image = await Image.findAll({
      attributes: { exclude: ['id_product'] },
      where: { id_product: elem.id },
    });

    arrayProduct.push({
      id: elem.id,
      id_user: elem.id_user,
      title: elem.title,
      description: elem.description,
      value: elem.value,
      images: image
    })
  })

  let get = setInterval(() => {
    if (arrayProduct.length === products.length) {
      console.log('ArrayProduct', arrayProduct)
      clearInterval(get);
      res.json(arrayProduct);
    }
  }, 10)
}