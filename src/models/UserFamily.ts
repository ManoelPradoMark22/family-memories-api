import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserFamily extends Model {}

UserFamily.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    family_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'families',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'UserFamily',
    tableName: 'user_families',
    timestamps: true,
  }
);

export default UserFamily;
