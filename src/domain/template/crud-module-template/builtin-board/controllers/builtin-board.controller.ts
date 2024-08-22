import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BuiltInBoardService } from '../services/builtin-board.service';
import { ModifyBuiltinBoardDto } from '../dtos/modify-builtin-board.dto';
import { BuiltinBoardDto } from '../dtos/builtin-board.dto';
import { ObjectResponse } from '../../../../../shared/dtos/object-response.dto';
import { ApiDoc } from '../../../../../shared/decorators/api-doc.decorator';
import { GenerateBuiltinBoardDto } from '../dtos/generate-builtin-board.dto';
import {
  Pagination,
  PaginationQuery,
} from '../../../../../shared/decorators/pagination-query.decorator';
import { FindBuiltinBoardDto } from '../dtos/find-builtin-board.dto';
import { ListResponse } from '../../../../../shared/dtos/list-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { swaggerConstants } from '../../../../../shared/constants/swagger.constants';

@ApiTags(swaggerConstants.tags.BUILTIN_BOARD)
@Controller('builtin-board')
export class BuildInBoardController {
  constructor(private readonly builtinBoardService: BuiltInBoardService) {}

  @ApiDoc({
    summary: '게시판 게시글 생성 API',
    description: '게시판 게시글을 생성하는 API 입니다.',
    responseModel: BuiltinBoardDto,
  })
  @Post()
  async post(
    @Body() generateBuiltinBoardDto: GenerateBuiltinBoardDto,
  ): Promise<ObjectResponse<BuiltinBoardDto>> {
    const builtinBoard: BuiltinBoardDto =
      await this.builtinBoardService.generateBuiltinBoard(
        generateBuiltinBoardDto,
      );

    return new ObjectResponse(builtinBoard);
  }

  @ApiDoc({
    summary: '게시판 게시글 목록 조회 API',
    description: '게시판 게시글 목록을 조회하는 API 입니다.',
    responseModel: BuiltinBoardDto,
    isArrayResponse: true,
  })
  @Get()
  async gets(
    @Query() findBuiltinBoardDto: FindBuiltinBoardDto,
    @PaginationQuery() pagination: Pagination,
  ): Promise<ListResponse<BuiltinBoardDto[]>> {
    const { list, count } =
      await this.builtinBoardService.getBuiltinBoardListAndCount(
        findBuiltinBoardDto,
        pagination,
      );

    return new ListResponse(list, count);
  }

  @ApiDoc({
    summary: '게시판 게시글 단일 조회 API',
    description: '게시판 게시글을 단일 조회하는 API 입니다.',
    responseModel: BuiltinBoardDto,
  })
  @Get('/:id')
  async get(@Param('id') id: number): Promise<ObjectResponse<BuiltinBoardDto>> {
    const findBuiltinBoardDto: FindBuiltinBoardDto = {
      id: id,
      phone: null,
      createdAtFrom: null,
      createdAtTo: null,
    };

    const builtinBoard: BuiltinBoardDto =
      await this.builtinBoardService.getBuiltinBoard(findBuiltinBoardDto);

    return new ObjectResponse(builtinBoard);
  }

  @ApiDoc({
    summary: '게시판 게시글 단일 수정 API',
    description: '게시판 게시글을 단일 수정하는 API 입니다.',
    responseModel: BuiltinBoardDto,
  })
  @Put('/:id')
  async put(
    @Param('id') id: number,
    @Body() modifyBuiltinBoardDto: ModifyBuiltinBoardDto,
  ): Promise<ObjectResponse<BuiltinBoardDto>> {
    const builtinBoard: BuiltinBoardDto =
      await this.builtinBoardService.modifyBuiltinBoard(
        id,
        modifyBuiltinBoardDto,
      );

    return new ObjectResponse(builtinBoard);
  }

  @ApiDoc({
    summary: '게시판 게시글 단일 삭제 API',
    description: '게시판 게시글을 단일 삭제하는 API 입니다.',
  })
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.builtinBoardService.removeBuiltinBoard(id);
  }
}
