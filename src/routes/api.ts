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

router.get('/updateuser', Auth.private ,UserController.updateUser);

router.get('/product',ProductController.listProduct);

router.get('/product/:search',ProductController.listProduct);

router.get('/product/id/:id',ProductController.getProduct);

router.post('/getuserproducts', Auth.private, ProductController.getUserProducts);

router.get('/getimages', ProductController.getImage);

router.post('/addproduct', Auth.private, ProductController.addProduct);

router.put('/updateproduct', Auth.private ,ProductController.updateProduct);

router.delete('/deleteproduct', Auth.private ,ProductController.deleteProduct);

router.post('/upload', Auth.private , upload.single('images'),  ProductController.uploadImages);



export default router;