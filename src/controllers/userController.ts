import { Request , Response } from "express";
import { User } from '../models/user';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request , res: Response) => {

if( req.body.name && req.body.email && req.body.password && req.body.cpf ) {
  let { name ,email, password , cpf } = req.body;

  let hasUser = await User.findOne({where: { email }});
  if(!hasUser) {
      let newUser = await User.create({name ,email, password , cpf });

      const token = JWT.sign(
        {id: newUser.id, email: newUser.email,},
        process.env.JWT_SECRET_KEY as string,
      );  
      res.status(201);
      res.json({ id: newUser.id , token});
      return;

  } else {
      res.json({ error: 'Usuario Já Cadastrado.' });
  }
} else {
  res.json({ error: 'Preencha os Campos' });
}
}

export const login = async (req: Request , res: Response) => {
  console.log(req.body);
  
  if( req.body.email && req.body.password ) {
    let email: string = req.body.email;
    let password: string = req.body.password;
    
    let user = await User.findOne({ 
        where: { email, password }
    });

    if(user) {
      const token = JWT.sign(
          {id: user.id, email: user.email, name: user.name},
          process.env.JWT_SECRET_KEY as string,
        );  
        res.json({ status: true, token});
        return;
    }
} else {
  // res.status(500);
  res.json({ status: false });
}
  
}


export const updateUser = async (req: Request , res: Response) => {
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

}

