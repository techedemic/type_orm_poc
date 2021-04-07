# TypeORM Proof-of-Concept (POC)

##### To run in development environment

- Ensure you have database. If not, create as follows (replace password/db name/etc as you see fit)

  - Log in to mysql

    ```bash
    mysql -u <admin_user_name> -p
    password:

    mysql>
    ```

  - Create a new database
    ```sql
    CREATE DATABASE typeorm_poc;
    ```
  - Create user to access `typeorm_poc` database only
    ```sql
    GRANT ALL ON typeorm_poc.* TO `poc_user`@`%` IDENTIFIED BY `poc_pass`
    ```

- The application uses the following environment variables. These will be taken from the environment (first). If not provided from cli environment, it will look for a `.env` file. The following values should be provided (sample values included):

  - `TYPEORM_CONNECTION = mysql` - Leave as `mysql` for purpose of this POC
  - `TYPEORM_HOST = localhost` - Host where your database is hosted.
  - `TYPEORM_USERNAME = typeorm_user` - Database username
  - `TYPEORM_PASSWORD = typeorm_pass` - Databae password
  - `TYPEORM_DATABASE = db_typeorm` - Database name
  - `TYPEORM_PORT = 3306` - Database port (will use default port for connection type if no provided)
  - `TYPEORM_SYNCHRONIZE = false` - If set to true, TypeORM will effect changes to DB automatically. Do NOT use in production
  - `TYPEORM_LOGGING = true` - Defaults to `false` but very handy in dev time to see what TypeORM is doing
  - `TYPEORM_ENTITIES = src/entity/**/*.ts` - Where TypeORM should look for entity files
  - `TYPEORM_MIGRATIONS = src/migration/**/*.ts` - Where TypeORM should look for migrations to run
  - `TYPEORM_MIGRATIONS_DIR = src/migration` - Where TypeORM should store migration file outputs from `npm run-migrations` command
  - `PORT=3000` - Express/Web server migrations

##### Migrations

In order to keep the database up to date with what is defined in the entities, you can use the TypeORM migrations tools.

As an example, lets say we have an entity of `User` like this:

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;
}
```

We now change the entity by adding another field, `createdAt` as follows:

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("table_users")
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({
    name: created_at,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  createdAt: string;
}
```

For this entity to work with the database, a new column, `created_at` needs to be added to the `table_users` table.

The easy way is to turn syncronisation on using the `TYPEORM_SYNCHRONIZE` environment variable. This is **NOT** recommended in production environments as you might have unintended SQL being generated which could delete some of your data.

Instead, we can generate the migrations using `npm run generate-migrations <branch-name>` which will generate migrations that can be reverted if needed using CI/CD.

See: https://betterprogramming.pub/typeorm-migrations-explained-fdb4f27cb1b3
