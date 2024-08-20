import { Injectable } from '@nestjs/common';
import { BuiltinBoardRepository } from '../repositories/builtin-board.repository';

@Injectable()
export class BuiltInBoardService {
  constructor(
    private readonly builtinBoardRepository: BuiltinBoardRepository,
  ) {}
}
