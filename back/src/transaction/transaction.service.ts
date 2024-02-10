import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      amount: Number(createTransactionDto.amount),
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

  async findAll(id: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        category: true,
      },
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

  async findAllByType(id: string, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id,
        },
        type,
      },
    });

    if (!transactions.length) {
      throw new NotFoundException('Transactions not found!');
    }

    const totalTransactionsSum = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    return totalTransactionsSum;
  }
}
