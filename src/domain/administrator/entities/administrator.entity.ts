// import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
// import { CoreSoftEntity } from '../../../shared/entities/core-soft.entity';
// import { ApiProperty } from '@nestjs/swagger';
// import { Account } from '../../account/entities/account.entity';
// import {
//   IsCustomMatches,
//   IsCustomString,
// } from '../../../shared/decorators/dto.decorator';
// import { regexConstants } from '../../../shared/constants/regex.constants';
//
// @Entity({
//   name: 'Administrator',
//   schema: process.env.DB_SCHEMA_NAME,
// })
// export class Administrator extends CoreSoftEntity {
//   @ApiProperty({
//     description: '계정 객체',
//     required: true,
//   })
//   @JoinColumn({ name: 'accountId' })
//   @OneToOne(() => Account, {
//     nullable: false,
//     eager: false,
//   })
//   account: Account;
//
//   @ApiProperty({
//     description: '이름',
//     example: '홍길동',
//     required: true,
//   })
//   @IsCustomString({ required: true, minLength: 1, maxLength: 100 })
//   @Column({
//     comment: '이름',
//     type: 'varchar',
//     nullable: false,
//     length: 100,
//   })
//   name: string;
//
//   @ApiProperty({
//     description: '아이디(이메일과 동일)',
//     example: 'defaultAdmin@slogup.com',
//     required: true,
//   })
//   @IsCustomMatches({
//     required: true,
//     pattern: regexConstants.props.EMAIL,
//   })
//   @Column({
//     comment: '아이디(이메일과 동일)',
//     type: 'varchar',
//     nullable: false,
//     length: 50,
//   })
//   aId: string;
//
//   @ApiProperty({
//     description: '휴대폰 번호',
//     example: '01012341234',
//     required: false,
//   })
//   @IsCustomMatches({
//     required: false,
//     pattern: regexConstants.props.PHONE,
//   })
//   @Column({
//     comment: '휴대폰 번호',
//     type: 'varchar',
//     nullable: true,
//     length: 20,
//   })
//   phone: string;
// }
