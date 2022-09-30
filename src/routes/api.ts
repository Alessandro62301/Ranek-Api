import { Transaction } from './../models/transaction';
import { Router } from 'express';
import multer from 'multer';
import * as ApiController from '../controllers/apiController';
import * as ProductController from '../controllers/productController';
import * as UserController from '../controllers/userController';
import * as TransactionController from '../controllers/transactionController'

import { Auth } from '../middlewares/auth';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp');
  },
});

const upload = multer({
  storage: storageConfig,
  limits: { fileSize: 4000000, files: 10 },
  fileFilter: function (req, file, cb) {
    const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
    cb(null, allowed.includes(file.mimetype));
  }
}).array('images');


const router = Router();


router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/validate', Auth.private, ApiController.validadeToken);

router.get('/updateuser', Auth.private, UserController.updateUser);

router.get('/product', ProductController.listProduct);

router.get('/product/:search', ProductController.listProduct);

router.get('/product/id/:id', ProductController.getProduct);

router.get('/getuserproducts', Auth.private, ProductController.getUserProducts);

router.post('/addproduct', Auth.private, ProductController.addProduct);

router.put('/updateproduct', Auth.private, ProductController.updateProduct);

router.delete('/deleteproduct', Auth.private, ProductController.deleteProduct);

// router.post('/uploadimage', Auth.private , upload.single('image'),  ProductController.uploadImage);

router.post('/uploadimages', Auth.private, upload, ProductController.uploadImages);

router.get('/listtransaction', TransactionController.listTransaction);

router.get('/listsoldproduct', Auth.private, ProductController.listSoldProduct);

router.get('/listboughtproduct', Auth.private, ProductController.listBoughtProduct);

router.post('/addtransaction', Auth.private, TransactionController.addTransaction);


export default router;