import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envFilePath from '../envs/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { commonConstants } from './shared/constants/common.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...commonConstants.props.NODE_ENV_ARRAY)
          .required(),
        TZ: Joi.string().valid('Asia/Seoul').required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SCHEMA: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      schema: process.env.DB_SCHEMA,
      logging: JSON.parse(process.env.DB_LOGGING),
      entities: ['../src/**/*.entity{.ts,.js}'],
      migrations: ['src/database/migrations/*.ts'],
      migrationsTableName: 'migrations',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
