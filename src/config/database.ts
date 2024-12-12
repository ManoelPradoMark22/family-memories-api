import { Sequelize } from 'sequelize';
import { ENV } from './env';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ENV.DATABASE_URL,
  logging: false,
});

export default sequelize;