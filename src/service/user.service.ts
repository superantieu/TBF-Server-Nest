import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TbUser } from '../entity/user.entity';
import { UserQuery } from 'src/queryParameter/user.query';
import { paginationFc } from 'src/utility/pagination.utility';
import removeAccents from 'src/utility/removeAccents';
import { discipineUser, isEmployed } from 'src/extensionQuery/user.extension';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TbUser)
    private readonly usersRepository: Repository<TbUser>,
  ) {}

  async findSearchAll(userQuery: UserQuery): Promise<{ users: TbUser[] }> {
    try {
      const { employed, searchTerm } = userQuery;
      const search = removeAccents(searchTerm).toLowerCase();
      const searchResult: Array<any> = [];

      let query = this.usersRepository.createQueryBuilder();
      query = isEmployed(query, employed);

      query = query.select([
        'TbUser.UserId',
        'TbUser.FullName',
        'TbUser.JobTitle',
        'TbUser.Discipline',
      ]);

      const users = await query.getMany();

      for (let i = 0; i < users.length; i++) {
        if (
          removeAccents(users[i]['FullName']).toLowerCase().includes(search)
        ) {
          searchResult.push(users[i]);
        }
        if (searchResult.length === 10) {
          break;
        }
      }
      return { users: searchResult };
    } catch (error) {
      console.error(`Error finding user`);
      throw error;
    }
  }
  async findAll(
    userQuery: UserQuery,
  ): Promise<{ users: TbUser[]; pagination: {} }> {
    try {
      const { pageNumber, pageSize, employed, discipline } = userQuery;

      const number = pageNumber || 1;
      const size = pageSize || 10;
      let query = this.usersRepository.createQueryBuilder();
      query = isEmployed(query, employed);
      query = discipineUser(query, discipline);

      query = query
        .select([
          'TbUser.UserId',
          'TbUser.FullName',
          'TbUser.JobTitle',
          'TbUser.Discipline',
        ])
        .skip(size * (number - 1))
        .take(size);

      console.log('users', query.getSql());
      const [users, totalUsers] = await query.getManyAndCount();
      const pagination = paginationFc(number, size, totalUsers);

      return { users, pagination };
    } catch (error) {
      console.error(`Error finding user`);
      throw error;
    }
  }

  async findUserById(UserId: number): Promise<TbUser[] | undefined> {
    try {
      const query = this.usersRepository
        .createQueryBuilder()
        .select([
          'TbUser.UserId',
          'TbUser.FullName',
          'TbUser.JobTitle',
          'TbUser.Discipline',
        ])
        .where('TbUser.UserId = :UserId', { UserId });
      const user = await query.getMany();
      console.log('user', query.getSql());
      return user;
    } catch (error) {
      console.error(`Error finding user by id ${UserId}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
