import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import envFilePath from '../../envs/env';

// Load the environment variables
config({ path: envFilePath });

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  schema: process.env.DB_SCHEMA,
  logging: JSON.parse(process.env.DB_LOGGING),
  synchronize: false,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: ['src/database/migrations/*.ts'],
  // migrations: ['/../database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  // seeds: [__dirname + '/../../**/*.seeder.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
