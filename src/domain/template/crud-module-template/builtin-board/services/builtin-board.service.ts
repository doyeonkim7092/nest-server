import { Injectable } from '@nestjs/common';
import { BuiltinBoardRepository } from '../repositories/builtin-board.repository';
import { DataSource, EntityManager, UpdateResult } from 'typeorm';
import { GenerateBuiltinBoardDto } from '../dtos/generate-builtin-board.dto';
import { FindBuiltinBoardDto } from '../dtos/find-builtin-board.dto';
import { BuiltinBoardDto } from '../dtos/builtin-board.dto';
import { Pagination } from '../../../../../shared/decorators/pagination-query.decorator';
import { ModifyBuiltinBoardDto } from '../dtos/modify-builtin-board.dto';

@Injectable()
export class BuiltInBoardService {
  constructor(
    private readonly builtinBoardRepository: BuiltinBoardRepository,
    private dataSource: DataSource,
  ) {}

  async generateBuiltinBoard(
    generateBuiltinBoardDto: GenerateBuiltinBoardDto,
    transactionManager?: EntityManager,
  ) {
    let runner;
    let result;

    const externalTransactionRunning = !!transactionManager;

    if (externalTransactionRunning) {
      runner = { manager: transactionManager };
    } else {
      runner = this.dataSource.createQueryRunner();
    }

    if (!externalTransactionRunning) await runner.startTransaction();

    try {
      result = await this.builtinBoardRepository.createBuiltinBoard(
        generateBuiltinBoardDto,
        runner.manager,
      );

      if (!externalTransactionRunning) await runner.commitTransaction();

      return result;
    } catch (e) {
      if (!externalTransactionRunning) await runner.rollbackTransaction();
      throw e;
    } finally {
      if (!externalTransactionRunning) await runner.releaseTransaction();
    }
  }

  async getBuiltinBoard(
    findBuiltinBoardDto: FindBuiltinBoardDto,
    transactionManager?: EntityManager,
  ) {
    const builtinBoard: BuiltinBoardDto =
      await this.builtinBoardRepository.findBuiltinBoard(
        findBuiltinBoardDto,
        transactionManager,
      );

    return builtinBoard;
  }

  async getBuiltinBoardListAndCount(
    findBuiltinBoardDto: FindBuiltinBoardDto,
    pagination: Pagination,
    transactionManager?: EntityManager,
  ): Promise<{ list: BuiltinBoardDto[]; count: number }> {
    const { list, count } =
      await this.builtinBoardRepository.findBuiltinBoardListAndCount(
        findBuiltinBoardDto,
        pagination,
        transactionManager,
      );

    return { list, count };
  }

  async modifyBuiltinBoard(
    id: number,
    modifyBuiltinBoardDto: ModifyBuiltinBoardDto,
    transactionManager?: EntityManager,
  ) {
    let runner;

    const externalTransactionRunning = !!transactionManager;

    if (externalTransactionRunning) {
      runner = { manager: transactionManager };
    } else {
      runner = this.dataSource.createQueryRunner();
    }

    if (!externalTransactionRunning) await runner.startTransaction();

    const findBuiltinBoardDto: FindBuiltinBoardDto = {
      id,
    };

    const target = await this.getBuiltinBoard(findBuiltinBoardDto);

    try {
      const updateResult: UpdateResult =
        await this.builtinBoardRepository.updateBuiltinBoard(
          id,
          modifyBuiltinBoardDto,
          runner.manager,
        );

      if (!externalTransactionRunning) await runner.commitTransaction();

      return await this.getBuiltinBoard(findBuiltinBoardDto);
    } catch (e) {
      if (!externalTransactionRunning) await runner.rollbackTransaction();
      throw e;
    } finally {
      if (!externalTransactionRunning) await runner.release();
    }
  }

  async removeBuiltinBoard(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<void> {
    return await this.builtinBoardRepository.deleteBuiltinBoard(
      id,
      transactionManager,
    );
  }
}
