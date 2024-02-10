import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { IUser } from 'src/types/user';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  type: 'expense' | 'income';

  @IsNotEmpty()
  category: Category;

  @IsOptional()
  user: IUser;
}
