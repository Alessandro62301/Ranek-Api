import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';  
import { Image } from '../models/image';

export interface ProductInstance extends Model {
  id: number;
  id_user: number;
  title: string;
  description: string;
  value: number;
}

export const Product = sequelize.define<ProductInstance>("Product",{
    id: {
      primaryKey:true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

  },
    {
      tableName: 'products',
      timestamps: false 
});
