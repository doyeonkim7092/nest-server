import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuiltinBoard } from './entities/builtin-board.entity';
import { BuiltInBoardService } from './services/builtin-board.service';
import { BuiltinBoardRepository } from './repositories/builtin-board.repository';
import { BuildInBoardController } from './controllers/builtin-board.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BuiltinBoard])],
  providers: [BuiltInBoardService, BuiltinBoardRepository],
  controllers: [BuildInBoardController],
  exports: [],
})
export class BuiltinBoardModule {}
