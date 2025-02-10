import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739230732209 implements MigrationInterface {
    name = 'Migration1739230732209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying(350) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying(100) NOT NULL`);
    }

}
