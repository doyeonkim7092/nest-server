import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountRepository],
  controllers: [],
  exports: [AccountService],
})
export class AccountModule {}
