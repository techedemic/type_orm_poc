import { MigrationInterface, QueryRunner } from 'typeorm';

export class master1617782974907 implements MigrationInterface {
    name = 'master1617782974907';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `table_users` CHANGE `firstName` `first_name` varchar(255) NOT NULL'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `table_users` CHANGE `first_name` `firstName` varchar(255) NOT NULL'
        );
    }
}
