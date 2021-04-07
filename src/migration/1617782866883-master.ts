import {MigrationInterface, QueryRunner} from "typeorm";

export class master1617782866883 implements MigrationInterface {
    name = 'master1617782866883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `table_users` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `gender` varchar(255) NULL, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `table_users`");
    }

}
