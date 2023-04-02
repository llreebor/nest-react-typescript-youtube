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

	async create(createCategoryDto: CreateCategoryDto) {
		const isExist = await this.categoryRepository.findOne({
			where: {
				title: createCategoryDto.title,
			},
		})
		if (isExist)
			throw new BadRequestException('This category already exist!')
		return await this.categoryRepository.save(createCategoryDto)
	}

	async findAll(id: number) {
		return await this.categoryRepository.find({
			where: {
				user: {
					id,
				},
			},
		})
	}

	// Find One Income
	async findOne(id: number, userId: number) {
		const isExist = await this.categoryRepository.findOneBy({
			id,
			user: {
				id: userId,
			},
		})

		if (!isExist) throw new NotFoundException('Category not found')

		return await this.categoryRepository.find({
			where: { id },
		})
	}

	// Update Category
	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const isExist = await this.categoryRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Category not found')

		return await this.categoryRepository.update(id, updateCategoryDto)
	}

	// Delete Category
	async remove(id: number) {
		const isExist = await this.categoryRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Category not found')

		return await this.categoryRepository.delete(id)
	}
}
