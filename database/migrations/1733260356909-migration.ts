import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733260356909 implements MigrationInterface {
    name = 'Migration1733260356909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "PK_0ff01343154ec14e84bed53d1ff"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "otp" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "PK_0ff01343154ec14e84bed53d1ff" PRIMARY KEY ("otp")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "PK_0ff01343154ec14e84bed53d1ff"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "otp" character varying(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "PK_0ff01343154ec14e84bed53d1ff" PRIMARY KEY ("otp")`);
    }

}
