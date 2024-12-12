import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class AlbumPhoto extends Model {}

AlbumPhoto.init({
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'albums',
      key: 'id',
    },
  },
  photo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'photos',
      key: 'id',
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'AlbumPhoto',
  tableName: 'album_photos',
  timestamps: true,
});

export default AlbumPhoto;