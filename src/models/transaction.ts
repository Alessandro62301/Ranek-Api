import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';  

export interface TransactionInstance extends Model {
  id: number;
  id_product: number;
  name: string;
}

export const Transaction = sequelize.define<TransactionInstance>("Transaction",{
    id: {
      primaryKey:true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_seller: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_buyer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
   
  },
    {
      tableName: 'transaction',
      timestamps: false 
});

// Transaction.sync({ alter: true })