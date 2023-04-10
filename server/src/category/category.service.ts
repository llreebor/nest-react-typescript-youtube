import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'
import { IByCategory } from 'src/types/types'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	async create(createCategoryDto: CreateCategoryDto, id: number) {
		const isExist = await this.categoryRepository.findBy({
			user: { id },
			title: createCategoryDto.title,
		})

		if (isExist.length)
			throw new BadRequestException('This category already exist!')

		const newCategory = {
			title: createCategoryDto.title,
			user: {
				id,
			},
		}
		return await this.categoryRepository.save(newCategory)
	}

	async findAll(id: number) {
		return await this.categoryRepository.find({
			where: {
				user: {
					id,
				},
			},
			relations: {
				transactions: true,
			},
		})
	}

	// Find One
	async findOne(id: number) {
		const isExist = await this.categoryRepository.findOne({
			where: { id },
			relations: {
				user: true,
			},
		})

		if (!isExist) throw new NotFoundException('Category not found')

		return isExist
	}

	// Update Category
	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const isExist = await this.categoryRepository.findOne({
			where: {
				id,
			},
			relations: {
				user: true,
			},
		})

		if (!isExist) throw new NotFoundException('Category not found')

		return await this.categoryRepository.update(id, updateCategoryDto)
	}

	// Delete Category
	async remove(id: number) {
		const isExist = await this.categoryRepository.findOne({
			where: {
				id,
			},
			relations: {
				user: true,
			},
		})

		if (isExist) return await this.categoryRepository.delete(id)

		throw new NotFoundException('Category not found')
	}

	// Get Incomes By Category
	async getIncomesByCategory(): Promise<IByCategory[]> {
		const categories = await this.categoryRepository.find({
			relations: ['transactions'],
		})

		const result = []

		for (const category of categories) {
			const total = category.transactions.reduce(
				(prev, curr) => prev + curr.amount,
				0,
			)
			result.push({
				title: category.title,
				total,
				transactions: category.transactions,
			})
		}

		return result
	}
}
