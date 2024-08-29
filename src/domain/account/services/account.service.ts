import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private dataSource: DataSource,
  ) {}
}
