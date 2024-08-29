import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(
      accountRepository.target,
      accountRepository.manager,
      accountRepository.queryRunner,
    );
  }
}
