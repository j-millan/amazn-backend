import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730419981465 implements MigrationInterface {
    name = 'Migration1730419981465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
    }

}
