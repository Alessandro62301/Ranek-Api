import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';  

export interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: number;
}

export const User = sequelize.define<UserInstance>("User",{
    id: {
      primaryKey:true,
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
        this.setDataValue('name',value.toLowerCase())
      }
    },

    firstLetterOfName : {
      type: DataTypes.VIRTUAL,
      get(){
        let name : String = this.getDataValue('name');
        return name.charAt(0);
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // set(value: String) {
      //   this.setDataValue('name',value)
      // }
    },
    cpf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },  
  },
    {
      tableName: 'users',
      timestamps: false 
});