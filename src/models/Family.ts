import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Family extends Model {}

Family.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Family',
    tableName: 'families',
    timestamps: true,
  }
);

export default Family;
