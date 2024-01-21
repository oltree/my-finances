import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async create(id: string, createTransactionDto: CreateTransactionDto) {
    const transaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: String(createTransactionDto.category) },
      user: { id },
    };

    if (!transaction) {
      throw new BadRequestException(
        'Transaction not created! Something went wrong...',
      );
    }

    return await this.transactionRepository.save(transaction);
  }

  async findAll(id: string, { page, limit, sort }: IPaginationOptions) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        category: true,
        user: {
          transactions: true,
        },
      },
      order: {
        createdAt: sort || 'DESC',
      },
      take: limit || 10,
      skip: (page - 1) * (limit || 10),
    });

    if (!transactions.length) {
      throw new NotFoundException('Transactions not found!');
    }

    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        category: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found!');
    }

    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found!');
    }

    const updatedTransaction = await this.transactionRepository.update(
      id,
      updateTransactionDto,
    );

    return updatedTransaction;
  }

  async remove(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found!');
    }

    return await this.transactionRepository.delete(id);
  }
}
