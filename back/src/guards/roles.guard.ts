import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;
    const user = request.user;

    const entity = await this.getEntityByIdAndType(id, type);

    return user && entity && user.id === entity.user.id;
  }

  private async getEntityByIdAndType(id: string, type: string) {
    switch (type) {
      case 'transaction':
        return await this.transactionService.findOne(id);
      case 'category':
        return await this.categoryService.findOne(id);
      default:
        throw new NotFoundException('Something went wrong...');
    }
  }
}
