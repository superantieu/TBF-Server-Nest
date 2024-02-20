import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UsersModule } from './module/users.module';
import { TimeSheetModule } from './module/timesheets.module';
import { TaskModule } from './module/tasks.module';
import { ProjectModule } from './module/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '121492bB',
      database: 'Polaris',
      // synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    UsersModule,
    TimeSheetModule,
    TaskModule,
    ProjectModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // dataSource.initialize();
  }
}
