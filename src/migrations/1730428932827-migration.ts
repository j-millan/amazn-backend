import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730428932827 implements MigrationInterface {
    name = 'Migration1730428932827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "slug" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "slug" SET NOT NULL`);
    }

}
