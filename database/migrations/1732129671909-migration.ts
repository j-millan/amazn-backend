import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732129671909 implements MigrationInterface {
    name = 'Migration1732129671909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(60)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(30) NOT NULL`);
    }

}
