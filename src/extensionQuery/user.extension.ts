import { SelectQueryBuilder } from 'typeorm';

import { TbUser } from 'src/entity/user.entity';

export const isEmployed = (
  query: SelectQueryBuilder<TbUser>,
  employed: number,
) => {
  if (employed) {
    query = query.andWhere('tbUser.Employed = :employed', { employed });
  }
  return query;
};

export const discipineUser = (
  query: SelectQueryBuilder<TbUser>,
  discipline: string,
) => {
  if (discipline) {
    query = query.andWhere('tbUser.Discipline = :discipline', {
      discipline,
    });
  }
  return query;
};
