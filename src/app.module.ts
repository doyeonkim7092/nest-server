import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envFilePath from '../envs/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { commonConstants } from './shared/constants/common.constants';
import { BuiltinBoardModule } from './domain/template/crud-module-template/builtin-board/builtin-board.module';
import { JwtMiddleware } from 'src/domain/jwt/middlewares/jwt.middleware';
import { join } from 'path';
import { JwtModule } from './domain/jwt/jwt.module';
import { dataSourceOptions } from './config/typeorm.config';
import { AccountModule } from './domain/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
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
        /**
         * TODO: JWT, AWS_URL, AWS_SECRET
         *         DB_SSL: Joi.string().required(),
         *         DB_LOGGING: Joi.string().required(),
         *         JWT_SECRET: Joi.string().required(),
         *         AWS_CDN_URL: Joi.string().required(),
         *         AWS_S3_BUCKET_NAME: Joi.string().required(),
         *         AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
         *         AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
         *         AWS_S3_REGION: Joi.string().required(),
         */
      }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    BuiltinBoardModule,
    AccountModule,
    JwtModule.forRoot({
      jwtSecret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
