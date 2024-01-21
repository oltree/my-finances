import { FindOptionsOrderValue } from 'typeorm';

export interface IPaginationOptions {
  page: number;
  limit: number;
  sort: FindOptionsOrderValue;
}
