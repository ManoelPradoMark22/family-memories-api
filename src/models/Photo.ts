import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ENV } from '../config/env';

class Photo extends Model {}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawUrl = this.getDataValue('url');
        const baseUrl = `http://localhost:${ENV.PORT}`;
        return `${baseUrl}${rawUrl}`;
      }
    }
  },
  {
    sequelize,
    modelName: 'Photo',
    tableName: 'photos',
    timestamps: true,
  }
);

export default Photo;
