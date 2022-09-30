import { Request, Response } from "express";
import { User } from '../models/user';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {

  if (req.body.name && req.body.email && req.body.password && req.body.cpf) {
    let { name, email, password, cpf, zipcode, stret, number, district, city, state } = req.body;

    let hasUser = await User.findOne({ where: { email } });
    if (!hasUser) {
      let newUser = await User.create({ name, email, password, cpf, zipcode, stret, number, district, city, state });

      const token = JWT.sign(
        { id: newUser.id, email: newUser.email, },
        process.env.JWT_SECRET_KEY as string,
      );
      res.status(201);
      res.json({ id: newUser.id, token });
      return;

    } else {
      res.json({ error: 'Usuario Já Cadastrado.' });
    }
  } else {
    res.json({ error: 'Preencha os Campos' });
  }
}

export const login = async (req: Request, res: Response) => {
  console.log(req.body);

  if (req.body.email && req.body.password) {
    let email: string = req.body.email;
    let password: string = req.body.password;

    let user = await User.findOne({
      where: { email, password }
    });

    if (user) {
      const token = JWT.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET_KEY as string,
      );
      res.json({ status: true, token });
      return;
    }
  } else {
    // res.status(500);
    res.json({ status: false });
  }

}


export const updateUser = async (req: Request, res: Response) => {
  let user = await User.findByPk(res.locals.user.id);
  let { name, email, password, cpf, zipcode, stret, number, district, city, state } = req.body;


  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    user.cpf = cpf;
    user.zipcode = zipcode;
    user.stret = stret;
    user.number = number;
    user.district = district;
    user.city = city;
    user.state = state;

    await user.save();
    res.status(200);
    res.json({ status: true })
  }
  res.status(400);
  res.json({ status: false })
}

