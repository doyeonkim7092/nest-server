import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository, UpdateResult } from 'typeorm';
import { BuiltinBoard } from '../entities/builtin-board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../../../../shared/decorators/pagination-query.decorator';
import { BuiltinBoardDto } from '../dtos/builtin-board.dto';
import { FindBuiltinBoardDto } from '../dtos/find-builtin-board.dto';
import { constants } from '../builtin-board.constants';
import { ModifyBuiltinBoardDto } from '../dtos/modify-builtin-board.dto';
import { GenerateBuiltinBoardDto } from '../dtos/generate-builtin-board.dto';

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

  async createBuiltinBoard(
    generateBuiltinBoardDto: GenerateBuiltinBoardDto,
    transactionManager?: EntityManager,
  ): Promise<BuiltinBoard> {
    try {
      let result = null;

      const instance = this.create(generateBuiltinBoardDto);

      if (transactionManager) {
        result = await transactionManager.save(BuiltinBoard, instance);
      } else {
        result = await this.save(instance);
      }

      return result;
    } catch (e) {
      switch (e.constraint) {
        default:
          throw e;
      }
    }
  }

  async findBuiltinBoardListAndCount(
    FindBuiltinBoardDto: FindBuiltinBoardDto,
    pagination: Pagination,
    transactionManager?: EntityManager,
  ): Promise<{ list: BuiltinBoard[]; count: number }> {
    const query = this.buildQuery(FindBuiltinBoardDto, transactionManager);

    if (pagination) {
      query
        .skip((pagination.page - 1) * pagination.pageSize)
        .take(pagination.pageSize);
    }

    const result = await query.getManyAndCount();

    if (!result || result[0].length < 1) {
      throw new NotFoundException({
        statusCode: 404,
        message: constants.errorMessages.BUILTIN_BOARD_CATEGORY_EMPTY_LIST.ko,
        errorCode:
          constants.errorMessages.BUILTIN_BOARD_CATEGORY_EMPTY_LIST.errorCode,
      });
    }

    return {
      list: result[0],
      count: result[1],
    };
  }

  async findBuiltinBoard(
    findBuiltinBoardDto: FindBuiltinBoardDto,
    transactionManager?: EntityManager,
  ): Promise<BuiltinBoardDto> {
    const query = this.buildQuery(findBuiltinBoardDto, transactionManager);

    const result = await query.getOne();

    if (!result) {
      throw new NotFoundException({
        statusCode: 404,
        message: constants.errorMessages.BUILTIN_BOARD_CATEGORY_EMPTY_LIST.ko,
        errorCode:
          constants.errorMessages.BUILTIN_BOARD_CATEGORY_EMPTY_LIST.errorCode,
      });
    }

    return result;
  }

  async updateBuiltinBoard(
    id: number,
    modifyBuiltinBoardDto: ModifyBuiltinBoardDto,
    transactionManager?: EntityManager,
  ): Promise<UpdateResult> {
    let result: UpdateResult = null;
    const instance = this.create(modifyBuiltinBoardDto);

    if (transactionManager) {
      result = await transactionManager.update(BuiltinBoard, id, instance);
    } else {
      result = await this.update(id, instance);
    }

    if (!result || result.affected === 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: constants.errorMessages.BUILTIN_BOARD_FAIL_TO_UPDATE_BY_ID.ko,
        errorCode:
          constants.errorMessages.BUILTIN_BOARD_FAIL_TO_UPDATE_BY_ID.errorCode,
      });
    }

    return result;
  }

  async deleteBuiltinBoard(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<void> {
    let result = null;
    if (transactionManager) {
      result = await transactionManager.softRemove(BuiltinBoard, { id });
    } else {
      result = await this.softRemove({ id });
    }

    if (result.deletedAt === null) {
      throw new BadRequestException({
        statusCode: 400,
        message: constants.errorMessages.BUILTIN_BOARD_FAIL_TO_DELETE_BY_ID.ko,
        errorCode:
          constants.errorMessages.BUILTIN_BOARD_FAIL_TO_DELETE_BY_ID.errorCode,
      });
    }
  }

  private buildQuery(
    FindBuiltinBoardDto: FindBuiltinBoardDto,
    transactionManager?: EntityManager,
  ) {
    const {
      category,
      writer,
      body,
      isActivated,
      phone,
      createdAtFrom,
      createdAtTo,
      id,
    } = FindBuiltinBoardDto;

    let query;

    if (transactionManager) {
      query = transactionManager.createQueryBuilder(BuiltinBoard, 'bb');
    } else {
      query = this.createQueryBuilder('bb');
    }

    if (id) {
      query.andWhere('bb.id = :id', { id });
    }
    if (category) {
      query.andWhere('bb.category = :category', { category });
    }
    if (writer) {
      query.andWhere('bb.writer LIKE `%` || :writer || `%`', { writer });
    }
    if (body) {
      query.andWhere('bb.writer LIKE `%` || :body || `%`', { body });
    }
    if (isActivated) {
      query.andWhere('bb.isActivated = :isActivated', { isActivated });
    }
    if (phone) {
    }
    if (createdAtFrom) {
      query.andWhere('bb.createdAt >= :createdAtFrom', { createdAtFrom });
    }
    if (createdAtTo) {
      query.andWhere('bb.createdAt <= :createdAtTo', { createdAtTo });
    }

    query.orderBy('bb.id', 'DESC');

    return query;
  }
}
