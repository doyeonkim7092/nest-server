// import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
//
// // In case you are using dotenv for environment variables
// const configService = new ConfigService();
//
// console.log(configService, 'dd');
//
// console.log({
//   type: 'postgres',
//   host: configService.get<string>('DB_HOST'),
//   port: configService.get<number>('DB_PORT'),
//   database: configService.get<string>('DB_NAME'),
//   // schema: configService.get<number>('DB_SCHEMA'),
//   username: configService.get<string>('DB_USERNAME'),
//   password: configService.get<string>('DB_PASSWORD'),
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   synchronize: false,
// });
//
// export const dataSource = new DataSource({
//   type: 'postgres',
//   host: configService.get<string>('DB_HOST'),
//   port: configService.get<number>('DB_PORT'),
//   database: configService.get<string>('DB_NAME'),
//   // schema: configService.get<number>('DB_SCHEMA'),
//   username: configService.get<string>('DB_USERNAME'),
//   password: configService.get<string>('DB_PASSWORD'),
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   synchronize: false,
// });
