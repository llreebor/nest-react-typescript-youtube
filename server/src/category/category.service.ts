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
				incomes: true,
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
}