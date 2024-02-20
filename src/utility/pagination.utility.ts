export const paginationFc = (
  pageNumber: number,
  pageSize: number,
  totalUsers: number,
) => {
  return {
    currentPage: +pageNumber,
    totalPages: Math.ceil(totalUsers / pageSize),
    pageSize: +pageSize,
    totalCount: totalUsers,
  };
};
