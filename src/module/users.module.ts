import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TbUser } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TbUser])],
  exports: [TypeOrmModule.forFeature([TbUser])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
