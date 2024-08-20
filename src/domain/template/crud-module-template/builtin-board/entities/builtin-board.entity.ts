import { Entity } from 'typeorm';

@Entity({
  name: 'BuiltinBoard',
  schema: process.env.DB_SCHEMA,
})
export class BuiltinBoard {}
