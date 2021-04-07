import {MigrationInterface, QueryRunner} from "typeorm";

export class master1617783900335 implements MigrationInterface {
    name = 'master1617783900335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `first_name` `first_name_changed` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `gender` `gender` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `updated_at` `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `table_car` DROP FOREIGN KEY `FK_57cfd9e121df8e9072e56c1e0f2`");
        await queryRunner.query("ALTER TABLE `table_car` CHANGE `updated_at` `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `table_car` CHANGE `created_at` `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `table_car` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `table_car` ADD CONSTRAINT `FK_57cfd9e121df8e9072e56c1e0f2` FOREIGN KEY (`userId`) REFERENCES `table_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `table_car` DROP FOREIGN KEY `FK_57cfd9e121df8e9072e56c1e0f2`");
        await queryRunner.query("ALTER TABLE `table_car` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_car` CHANGE `created_at` `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `table_car` CHANGE `updated_at` `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `table_car` ADD CONSTRAINT `FK_57cfd9e121df8e9072e56c1e0f2` FOREIGN KEY (`userId`) REFERENCES `table_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `updated_at` `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `gender` `gender` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `table_users` CHANGE `first_name_changed` `first_name` varchar(255) NOT NULL");
    }

}
