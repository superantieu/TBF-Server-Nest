import { SelectQueryBuilder } from 'typeorm';

import { TbProject } from 'src/entity/project.entity';

export const isComplete = (
  normalQuery: SelectQueryBuilder<TbProject>,
  isCompleted: number,
) => {
  console.log('iscom', isCompleted, typeof isCompleted);
  if (isCompleted === 1) {
    normalQuery = normalQuery.andWhere('p.CompletedDate IS NOT NULL');
  }
  if (isCompleted === 0) {
    normalQuery = normalQuery.andWhere('p.CompletedDate IS NULL');
  }
  return normalQuery;
};
export const hasProjectId = (
  normalQuery: SelectQueryBuilder<TbProject>,
  projectId: string,
) => {
  if (projectId) {
    normalQuery = normalQuery.andWhere(`p.ProjectId = :projectId`, {
      projectId: `${projectId}`,
    });
  }
  return normalQuery;
};
export const hasMember = (
  normalQuery: SelectQueryBuilder<TbProject>,
  member: number,
) => {
  if (member) {
    normalQuery = normalQuery.andWhere(
      `p.ListMember LIKE :member OR p.ListLeader LIKE :member  OR p.ListManager LIKE :member`,
      { member: `%${member}%` },
    );
  }
  return normalQuery;
};
export const hasSearchTerm = (
  normalQuery: SelectQueryBuilder<TbProject>,
  searchTerm: string,
) => {
  if (searchTerm) {
    normalQuery = normalQuery.andWhere(`p.ProjectName LIKE :searchTerm`, {
      searchTerm: `%${searchTerm}%`,
    });
  }
  return normalQuery;
};
export const hasChooseProject = (
  normalQuery: SelectQueryBuilder<TbProject>,
  chooseProject: any,
) => {
  if (chooseProject) {
    const q = chooseProject.join("','");
    console.log('q', `'${q}'`);
    normalQuery = normalQuery.andWhere(`p.ProjectId in ('${q}')`);
    // normalQuery = normalQuery.andWhere('p.ProjectId in (:projectIds)', {
    //   projectIds: `'${q}'`,
    // });
  }
  return normalQuery;
};
