import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: number;
  zipcode: string;
  stret: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

export const User = sequelize.define<UserInstance>("User", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('name').toUpperCase();
    },
    set(value: String) {
      this.setDataValue('name', value.toLowerCase())
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stret: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
},
  {
    tableName: 'users',
    timestamps: false
  });

// User.sync({ alter: true })
