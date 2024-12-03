import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733185415851 implements MigrationInterface {
    name = 'Migration1733185415851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "UQ_463cf01e0ea83ad57391fd4e1d7" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "UQ_463cf01e0ea83ad57391fd4e1d7"`);
    }

}
