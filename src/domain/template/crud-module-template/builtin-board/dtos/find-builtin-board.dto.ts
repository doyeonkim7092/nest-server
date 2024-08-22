import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsCustomDate,
  IsCustomString,
} from 'src/shared/decorators/dto.decorator';
import {
  transformStringToDate,
  transformStringToDateEnd,
  transformStringToDateStart,
} from 'src/shared/helpers/date.helpers';
import { BuiltinBoardDto } from './builtin-board.dto';

export class FindBuiltinBoardDto extends PickType(
  PartialType(BuiltinBoardDto),
  ['category', 'writer', 'body', 'isActivated'],
) {
  @ApiProperty({
    description: '회원의 휴대폰 번호',
    example: '01012345678',
    required: false,
  })
  @IsCustomString({ required: false, minLength: 0, maxLength: 15 })
  phone?: string;

  @ApiProperty({
    description: '생성 일시 시작일',
    example: '2022-01-01T00:00:00.000+09:00',
    required: false,
    type: 'string',
  })
  //TODO dayJs로
  @Transform(({ value }) => transformStringToDateStart(value))
  @IsCustomDate({ required: false })
  createdAtFrom?: string;

  @ApiProperty({
    description: '생성 일시 종료일',
    example: '2022-01-02T23:59:59.000+09:00',
    required: false,
    type: 'string',
  })
  @Transform(({ value }) => transformStringToDateEnd(value))
  @IsCustomDate({ required: false })
  createdAtTo?: string;

  id?: number;
}
