import { IsNotEmpty, IsOptional } from 'class-validator';
import { IUser } from 'src/types/user';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  user?: IUser;
}
