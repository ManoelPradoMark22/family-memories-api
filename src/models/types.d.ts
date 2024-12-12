import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import User from './User';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {}