import { MigrationInterface, QueryRunner } from 'typeorm';

export class channelIdtypechange1672194541260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.queries(
    //   'alter table userChannelData modify channel_id varchar(100) not null',
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
