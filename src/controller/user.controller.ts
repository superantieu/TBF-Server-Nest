import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserService } from '../service/user.service';
import { UserResponse } from 'src/responseDto/user.responseDto';
import { UserQuery } from 'src/queryParameter/user.query';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(@Query() userQuery: UserQuery): Promise<UserResponse> {
    const searchTerm = userQuery.searchTerm;

    try {
      if (searchTerm) {
        const data = await this.userService.findSearchAll(userQuery);

        if (!data) {
          return { result: null, message: 'User not found' };
        }
        return {
          message: 'Select user successfully',
          result: data.users,
        };
      }

      const data = await this.userService.findAll(userQuery);

      if (!data) {
        return { result: null, message: 'User not found' };
      }
      return {
        message: 'Select user successfully',
        pagination: data.pagination,
        result: data.users,
      };
    } catch (error) {
      return { result: null, message: 'Error finding user' };
    }
  }
  @Get(':id')
  async findUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    try {
      const user = await this.userService.findUserById(id);

      if (!user) {
        return { result: null, message: 'User not found' };
      }
      return { result: user, message: 'Select user successfully' };
    } catch (error) {
      return { result: null, message: 'Error finding user' };
    }
  }

  //   @Post()
  //   async createUser(@Body() userData: User): Promise<User> {
  //     return this.userService.createUser(userData);
  //   }
}
