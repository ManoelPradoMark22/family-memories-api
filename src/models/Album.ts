import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Family from './Family';

class Album extends Model {}

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    family_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Family,
        key: 'id',
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
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
    modelName: 'Album',
    tableName: 'albums',
    timestamps: true,
  }
);

export default Album;
