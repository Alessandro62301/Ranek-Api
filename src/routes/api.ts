import { Router } from 'express';
import * as ApiController from '../controllers/apiController'
import * as ProductController from '../controllers/productController'
import * as UserController from '../controllers/userController'


const router = Router();


router.get('/user',UserController.user);

router.get('/add/user',UserController.addUser);

router.get('/update/user',UserController.upUser);

router.get('/product',ProductController.product);

router.get('/product/:search',ProductController.product);

router.get('/add/product',ProductController.addProduct);

router.get('/update/product',ProductController.upProduct);

router.get('/remove/product',ProductController.RemoveProduct);




export default router;