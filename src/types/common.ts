export interface IPaginationPayload {
  pageNumber: number;
  pageSize: number;
  searchTerm?: ISearchTerm;
}

export interface ISearchTerm {
  fieldName: string;
  value: string;
}
