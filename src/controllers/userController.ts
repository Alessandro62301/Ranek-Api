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
  try {
    const usr = User.build({
      name: "Lucas2 Llalala",
      email: "lucas22@gmail.com",
      password: '1234',
      cpf:11156233344,
    });
    await usr.save();

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

