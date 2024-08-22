import { PartialType } from '@nestjs/swagger';
import { GenerateBuiltinBoardDto } from './generate-builtin-board.dto';

export class ModifyBuiltinBoardDto extends PartialType(
  GenerateBuiltinBoardDto,
) {}
