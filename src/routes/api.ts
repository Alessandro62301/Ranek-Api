import { Router } from 'express';
import multer from 'multer';
// import * as ApiController from '../controllers/apiController';
import * as ProductController from '../controllers/productController';
import * as UserController from '../controllers/userController';

import { Auth } from '../middlewares/auth';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp');
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ['image/jpg' , 'image/jpeg' , 'image/png'];
      cb(null,allowed.includes( file.mimetype ));
  },
  limits: { fileSize: 4000000 },
  storage: storageConfig
});

const router = Router();


router.post('/login',UserController.login);

router.post('/register',UserController.register);

router.get('/update/user', Auth.private ,UserController.updateUser);

router.get('/product',ProductController.listProduct);

router.get('/product/:search',ProductController.listProduct);

router.get('/product/id/:id',ProductController.getProduct);

router.post('/add/product', Auth.private, ProductController.addProduct);

router.put('/update/product', Auth.private ,ProductController.updateProduct);

router.delete('/delete/product', Auth.private ,ProductController.deleteProduct);

router.post('/upload', Auth.private , upload.single('images'),  ProductController.uploadImages);



export default router;