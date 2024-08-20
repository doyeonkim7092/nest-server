import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BuiltinBoard } from '../entities/builtin-board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BuiltinBoardRepository extends Repository<BuiltinBoard> {
  constructor(
    @InjectRepository(BuiltinBoard)
    private readonly builtinBoardRepository: Repository<BuiltinBoard>,
  ) {
    super(
      builtinBoardRepository.target,
      builtinBoardRepository.manager,
      builtinBoardRepository.queryRunner,
    );
  }
}
