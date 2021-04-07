import {MigrationInterface, QueryRunner} from "typeorm";

export class master1617783501192 implements MigrationInterface {
    name = 'master1617783501192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `car` (`id` int NOT NULL AUTO_INCREMENT, `make` varchar(255) NOT NULL, `model` varchar(255) NOT NULL, `year` int NOT NULL, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `gender` `gender` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `updated_at` `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `car` ADD CONSTRAINT `FK_a4f3cb1b950608959ba75e8df36` FOREIGN KEY (`userId`) REFERENCES `table_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `car` DROP FOREIGN KEY `FK_a4f3cb1b950608959ba75e8df36`");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `updated_at` `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `gender` `gender` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP TABLE `car`");
    }

}
