import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create({ title }: CreateCategoryDto, id: string) {
    const category = {
      title,
      user: { id },
    };

    const existingСategories = await this.categoryRepository.findBy(category);

    if (existingСategories.length > 0) {
      throw new BadRequestException('Category already exists!');
    }

    const newCategory = await this.categoryRepository.save(category);

    return newCategory;
  }

  async findAll(id: string) {
    const categories = await this.categoryRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        transactions: true,
      },
    });

    if (!categories.length) {
      throw new NotFoundException('Categories not found!');
    }

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        transactions: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );

    return updatedCategory;
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    return await this.categoryRepository.delete(id);
  }
}
