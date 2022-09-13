import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';  

export interface ImageInstance extends Model {
  id: number;
  id_product: number;
  name: string;
  // url: string;
}

export const Image = sequelize.define<ImageInstance>("Image",{
    id: {
      primaryKey:true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // url: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
   
  },
    {
      tableName: 'images',
      timestamps: false 
});