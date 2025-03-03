import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734599116338 implements MigrationInterface {
    name = 'Migration1734599116338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "description" character varying(100) NOT NULL, "slug" character varying, "imageUrl" character varying NOT NULL, "parentId" integer, CONSTRAINT "UQ_7b7115fda47b20b277b8ca6f89f" UNIQUE ("description"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
