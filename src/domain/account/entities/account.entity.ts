import { CoreSoftEntity } from '../../../shared/entities/core-soft.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { transformStringToDate } from '../../../shared/helpers/date.helpers';
import { Services } from '../../../shared/enums/common.enums';
import {
  IsCustomBoolean,
  IsCustomEnum,
  IsCustomNumber,
  IsCustomString,
} from '../../../shared/decorators/dto.decorator';

@Entity({
  name: 'Account',
  schema: process.env.DB_SCHEMA_NAME,
})
export class Account extends CoreSoftEntity {
  @ApiProperty({
    description: '계정이 사용하는 서비스 유형',
    example: Services.CUSTOMER_APP,
    required: true,
    enum: Services,
  })
  @IsCustomEnum({ required: true, type: Services })
  @Column({
    comment: '계정이 사용하는 서비스 유형',
    type: 'varchar',
    nullable: false,
    length: 15,
  })
  service: string;

  @ApiProperty({
    description: '비밀번호',
    example: '#$%^&*()',
    required: false,
  })
  @IsCustomString({ required: false, minLength: 1, maxLength: 200 })
  @Column({
    comment: '비밀번호',
    type: 'varchar',
    nullable: true,
    length: 200,
    select: false,
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: '비밀번호 변경 일시',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @Column({
    comment: '비밀번호 변경 일시',
    type: 'timestamptz',
    nullable: false,
    default: null,
  })
  passwordChangedAt: Date;

  @ApiProperty({
    description: '임시 비밀번호 여부',
    example: true,
    required: false,
    nullable: false,
  })
  @IsCustomBoolean({ required: false })
  @Column({
    comment: '임시 비밀번호 여부',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isTempPassword: boolean;

  @ApiProperty({
    description: '비밀번호 잠금 날짜',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @Column({
    comment: '비밀번호 잠금 날짜',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  lockedAt: Date;

  @ApiProperty({
    description: '마지막 로그인 날짜',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @Column({
    comment: '마지막 로그인 날짜',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  lastLoggedInAt: Date;

  @ApiProperty({
    description: '로그인 실패 횟수',
    example: 1,
    required: false,
    nullable: false,
  })
  @IsCustomNumber({
    required: false,
    minNumber: 0,
    maxNumber: Number.MAX_SAFE_INTEGER,
  })
  @Column({
    comment: '로그인 실패 횟수',
    type: 'int',
    nullable: false,
    default: 0,
  })
  loginFailCount: number;

  @ApiProperty({
    description: '필수 약관 동의 날짜',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @CreateDateColumn({
    comment: '필수 약관 동의 날짜',
    type: 'timestamptz',
    nullable: false,
    default: null,
  })
  requiredTermsAgreedAt: Date;

  @ApiProperty({
    description: '선택 약관 동의 날짜',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: false,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @CreateDateColumn({
    comment: '선택 약관 동의 날짜',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  optionalTermsAgreedAt: Date;

  @ApiProperty({
    description: '푸시 수신 여부',
    example: true,
    required: false,
    nullable: false,
  })
  @IsCustomBoolean({ required: false })
  @Column({
    comment: '푸시 수신 여부',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  pushReceivable: boolean;

  @ApiProperty({
    description: '푸시 수신 가능 시작 시간',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @CreateDateColumn({
    comment: '푸시 수신 가능 시작 시간',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  pushAlarmHHMMStartAt: Date;

  @ApiProperty({
    description: '푸시 수신 가능 마지막 시간',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => transformStringToDate(value))
  @CreateDateColumn({
    comment: '푸시 수신 가능 마지막 시간',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  pushAlarmHHMMEndAt: Date;

  @ApiProperty({
    description: '문자 수신 여부',
    example: true,
    required: false,
    nullable: false,
  })
  @Column({
    comment: '푸시 수신 여부',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  smsReceivable: boolean;

  @ApiProperty({
    description: '카카오톡 수신 여부',
    example: true,
    required: false,
    nullable: false,
  })
  @Column({
    comment: '카카오톡 수신 여부',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  kakaoReceivable: boolean;

  @ApiProperty({
    description: '이메일 수신 여부',
    example: true,
    required: false,
    nullable: false,
  })
  @Column({
    comment: '이메일 수신 여부',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  emailReceivable: boolean;
}
