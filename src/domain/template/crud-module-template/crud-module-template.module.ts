import { Module } from '@nestjs/common';
import { BuiltinBoardModule } from './builtin-board/builtin-board.module';

@Module({
  imports: [BuiltinBoardModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BuildModuleTemplateModule {}
