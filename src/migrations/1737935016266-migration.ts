import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737935016266 implements MigrationInterface {
    name = 'Migration1737935016266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "stock" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
    }

}
