import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1724893718352 implements MigrationInterface {
    name = 'InitialMigration1724893718352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Account" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "service" character varying(15) NOT NULL,
                "password" character varying(200),
                "passwordChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "isTempPassword" boolean NOT NULL DEFAULT true,
                "lockedAt" TIMESTAMP WITH TIME ZONE,
                "lastLoggedInAt" TIMESTAMP WITH TIME ZONE,
                "loginFailCount" integer NOT NULL DEFAULT '0',
                "requiredTermsAgreedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "optionalTermsAgreedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "pushReceivable" boolean NOT NULL DEFAULT true,
                "pushAlarmHHMMStartAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "pushAlarmHHMMEndAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "smsReceivable" boolean NOT NULL DEFAULT true,
                "kakaoReceivable" boolean NOT NULL DEFAULT true,
                "emailReceivable" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "Account"."id" IS '데이터 ID(PK)';
            COMMENT ON COLUMN "Account"."createdAt" IS '생성 일시';
            COMMENT ON COLUMN "Account"."updatedAt" IS '수정 일시';
            COMMENT ON COLUMN "Account"."deletedAt" IS '삭제 일시';
            COMMENT ON COLUMN "Account"."service" IS '계정이 사용하는 서비스 유형';
            COMMENT ON COLUMN "Account"."password" IS '비밀번호';
            COMMENT ON COLUMN "Account"."passwordChangedAt" IS '비밀번호 변경 일시';
            COMMENT ON COLUMN "Account"."isTempPassword" IS '임시 비밀번호 여부';
            COMMENT ON COLUMN "Account"."lockedAt" IS '비밀번호 잠금 날짜';
            COMMENT ON COLUMN "Account"."lastLoggedInAt" IS '마지막 로그인 날짜';
            COMMENT ON COLUMN "Account"."loginFailCount" IS '로그인 실패 횟수';
            COMMENT ON COLUMN "Account"."requiredTermsAgreedAt" IS '필수 약관 동의 날짜';
            COMMENT ON COLUMN "Account"."optionalTermsAgreedAt" IS '선택 약관 동의 날짜';
            COMMENT ON COLUMN "Account"."pushReceivable" IS '푸시 수신 여부';
            COMMENT ON COLUMN "Account"."pushAlarmHHMMStartAt" IS '푸시 수신 가능 시작 시간';
            COMMENT ON COLUMN "Account"."pushAlarmHHMMEndAt" IS '푸시 수신 가능 마지막 시간';
            COMMENT ON COLUMN "Account"."smsReceivable" IS '푸시 수신 여부';
            COMMENT ON COLUMN "Account"."kakaoReceivable" IS '카카오톡 수신 여부';
            COMMENT ON COLUMN "Account"."emailReceivable" IS '이메일 수신 여부'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "Account"
        `);
    }

}
