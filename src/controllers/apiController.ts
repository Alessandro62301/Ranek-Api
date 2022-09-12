// import { Request , Response } from "express";
// import { Op } from 'sequelize';
import { sequelize  } from "../instances/mysql";
// import { User } from '../models/user';
// import { Product } from '../models/product';


sequelize.authenticate();
console.log("Conectado");

// export const ping = (req: Request , res: Response) => {
//   res.json({pong:true});
// }

// export const user = async (req: Request , res: Response) => {
//   try {
//       let results = await User.findAll({
//       attributes: {exclude: ['password']},
//     });
//     res.json(results);
//   }catch(error){
//     console.log('error' + error);
//   }
// }
// export const addUser = async (req: Request , res: Response) => {
//   try {
//     const usr = User.build({
//       name: 'Nome de teste',
//       email: 'email@gmail.com',
//       password: '1234',
//       cpf:11122233344,
//     });
//     await usr.save();

//   }catch(error){
//     console.log('error' + error);
//   }
// }


// export const upUser = async (req: Request , res: Response) => {
//   try {
//     let results = await User.findAll({
//       attributes: {exclude: ['password']},
//       where: {
//         id:1
//       }   
//     });
//     if(results.length > 0){
//       let user = results[0];
//       user.name = 'Lucas Llalala';
//       await user.save();
//     }
//     console.log("User Updated");

//   }catch(error){
//     console.log('error' + error);
//   }
// }

// export const product = async (req: Request , res: Response) => {

//   try {
//       let prod = await Product.findAll({
//         where: { 
//           [Op.or]: {
//             title: {
//               [Op.like]: req.params.search==undefined ? '%' : '%'+req.params.search+'%'
//             },
//             description: {
//               [Op.like]: req.params.search==undefined ? '%' : '%'+req.params.search+'%'
//             }
//           } 
//          }
//       });
//       res.json(prod);

//   }catch(error){
//     console.log('error' + error);
//   }
// }

// export const addProduct = async (req: Request , res: Response) => {
//   try {
//       const prod = Product.build({
//         id_user: 2,
//         title: 'Inserida com Sequelize',
//         description: 'lalalalla',
//         value: 124
//       });
//       await prod.save();
//       console.log("Product Add");
      
//   }catch(error){
//     console.log('error' + error);
//   }
// }

// export const upProduct = async (req: Request , res: Response) => {
//   try {

//     let results = await Product.findAll({
//       where: {
//         id:1
//       }   
//     });
//     if(results.length > 0){
//       let product = results[0];
//       product.title = 'title Llalala';
//       await product.save();
//     }
//       console.log("Product Updated");
      
//   }catch(error){
//     console.log('error' + error);
//   }
// }

// export const RemoveProduct = async (req: Request , res: Response) => {
//   try {
//     let results = await Product.findAll({
//       where: {
//         id:2
//       }   
//     });
//     if(results.length > 0){
//       let product = results[0];
      
//       await product.destroy();
//     }
//     console.log(`Item Removido!`);
    
//   }catch(error){
//     console.log('error' + error);
//   }
// }
