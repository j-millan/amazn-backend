import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732941410609 implements MigrationInterface {
    name = 'Migration1732941410609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("otp" character varying(6) NOT NULL, "email" character varying(254) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_463cf01e0ea83ad57391fd4e1d7" UNIQUE ("email"), CONSTRAINT "PK_0ff01343154ec14e84bed53d1ff" PRIMARY KEY ("otp"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
