import { Controller } from '@nestjs/common';
import { BuiltInBoardService } from '../services/builtin-board.service';

@Controller('builtin-board')
export class BuildInBoardController {
  constructor(private readonly builtinBoardService: BuiltInBoardService) {}
}
