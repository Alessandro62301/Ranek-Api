import { Router } from 'express';
import * as ApiController from '../controllers/apiController'
import * as ProductController from '../controllers/productController'
import * as UserController from '../controllers/userController'


const router = Router();


router.get('/user',UserController.user);

router.post('/add/user',UserController.addUser);

router.get('/update/user',UserController.upUser);

router.get('/product',ProductController.listProduct);

router.get('/product/:search',ProductController.listProduct);

router.get('/product/id/:id',ProductController.getProduct);

router.post('/add/product',ProductController.addProduct);

router.put('/update/product/:id',ProductController.upProduct);

router.get('/remove/product',ProductController.RemoveProduct);




export default router;