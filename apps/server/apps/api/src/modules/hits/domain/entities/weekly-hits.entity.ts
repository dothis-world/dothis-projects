import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'weekly_views' })
export class WeeklyHitsEntity {
  @PrimaryColumn({ name: 'ranking', type: 'int' })
  ranking: number;

  @PrimaryColumn({
    name: 'keyword',
    type: 'varchar',
    length: 30,
  })
  keyword: string;

  @Column({ name: 'category', type: 'varchar', length: 30, nullable: true })
  category: string;

  @Column({ name: 'weekly_views', type: 'bigint', nullable: true })
  weeklyViews: number;

  @Column({ name: 'video_count', type: 'int', nullable: true })
  videoCount: number;

  @Column({ name: 'competitive', type: 'float', nullable: true })
  competitive: number;

  @Column({ name: 'mega_channel', type: 'int', nullable: true })
  megaChannel: number;

  @Column({ name: 'last_ranking', type: 'int', nullable: true })
  lastRanking: number;

  @PrimaryColumn({ name: 'YEAR', type: 'int' })
  year: number;

  @PrimaryColumn({ name: 'MONTH', type: 'int' })
  month: number;

  @PrimaryColumn({ name: 'DAY', type: 'int' })
  day: number;
}
