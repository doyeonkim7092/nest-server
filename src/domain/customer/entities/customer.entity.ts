import { CoreSoftEntity } from '../../../shared/entities/core-soft.entity';
import { Entity } from 'typeorm';

@Entity({
  name: 'customer',
  schema: process.env.DB_SCHEMA_NAME,
})
export class Customer extends CoreSoftEntity {}
