import { Request , Response } from "express";
import { User } from '../models/user';

export const register = async (req: Request , res: Response) => {

if( req.body.name && req.body.email && req.body.password && req.body.cpf ) {
  let { name ,email, password , cpf } = req.body;

  let hasUser = await User.findOne({where: { email }});
  if(!hasUser) {
      let newUser = await User.create({name ,email, password , cpf });

      res.status(201);
      res.json({ id: newUser.id });
  } else {
      res.json({ error: 'E-mail já existe.' });
  }
}
}

export const login = async (req: Request , res: Response) => {
  
  if( req.body.email && req.body.password ) {
    let email: string = req.body.email;
    let password: string = req.body.password;

    let user = await User.findOne({ 
        where: { email, password }
    });

    if(user) {
        res.json({ status: true });
        return;
    }
}

res.json({ status: false });
}



export const updateUser = async (req: Request , res: Response) => {
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

