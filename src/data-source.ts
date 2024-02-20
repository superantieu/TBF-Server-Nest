export {};
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: '121492bB',
  database: 'Polaris',
  synchronize: true,
  entities: ['src/entity/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  autoLoadEntities: true,
  extra: {
    trustServerCertificate: true,
  },
};
export const dataSource = new DataSource(config as DataSourceOptions);
