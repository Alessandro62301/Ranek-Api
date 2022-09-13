import { Router } from 'express';
import multer from 'multer';
// import * as ApiController from '../controllers/apiController'
import * as ProductController from '../controllers/productController'
import * as UserController from '../controllers/userController'

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


router.get('/user',UserController.user);

router.post('/add/user',UserController.addUser);

router.get('/update/user',UserController.upUser);

router.get('/product',ProductController.listProduct);

router.get('/product/:search',ProductController.listProduct);

router.get('/product/id/:id',ProductController.getProduct);

router.post('/add/product',ProductController.addProduct);

router.put('/update/product',ProductController.updateProduct);

router.delete('/delete/product',ProductController.deleteProduct);

router.post('/upload', upload.single('images'), ProductController.uploadImages);



export default router;