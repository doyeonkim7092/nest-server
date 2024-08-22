import { PickType } from '@nestjs/swagger';
import { BuiltinBoardDto } from './builtin-board.dto';

export class GenerateBuiltinBoardDto extends PickType(BuiltinBoardDto, [
  'category',
  'writer',
  'birth',
  'phone',
  'body',
  'isActivated',
]) {}
