import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1675324634077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table UserChannelData add unique (id)');
    await queryRunner.query(
      'alter table UserChannelData modify id int unsigned auto_increment',
    );
    await queryRunner.query(
      'alter table UserChannelData modify user_id int unsigned not null after id',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
