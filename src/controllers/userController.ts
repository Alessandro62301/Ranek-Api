import { Request , Response } from "express";
import { Op } from 'sequelize';
import { User } from '../models/user';


export const user = async (req: Request , res: Response) => {
  try {
      let results = await User.findAll({
      attributes: {exclude: ['password']},
    });
    res.json(results);
  }catch(error){
    console.log('error' + error);
  }
}
export const addUser = async (req: Request , res: Response) => {
  let {name , email , password , cpf} = req.body;
  try {
    let newUser = await User.create({name , email , password , cpf});
    console.log(newUser);
    res.json({id:newUser.id , email , password , cpf});
    res.status(201);
  }catch(error){
    console.log('error' + error);
  }
}


export const upUser = async (req: Request , res: Response) => {
  try {
    let results = await User.findAll({
      attributes: {exclude: ['password']},
      where: {
        id:1
      }   
    });
    if(results.length > 0){
      let user = results[0];
      user.name = 'Lucas Llalala';
      await user.save();
    }
    console.log("User Updated");

  }catch(error){
    console.log('error' + error);
  }
}

