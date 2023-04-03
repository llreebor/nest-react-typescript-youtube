import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateIncomeDto } from './dto/create-income.dto'
import { UpdateIncomeDto } from './dto/update-income.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Income } from './entities/income.entity'
import { Repository } from 'typeorm'

@Injectable()
export class IncomeService {
	constructor(
		@InjectRepository(Income)
		private readonly incomeRepository: Repository<Income>,
	) {}

	// Create Income
	async create(createIncomeDto: CreateIncomeDto, user) {
		const newIncome = this.incomeRepository.create({
			title: createIncomeDto.title,
			sum: createIncomeDto.sum,
			user: {
				id: user,
			},
		})
		return this.incomeRepository.save(newIncome)
	}

	// Find All Incomes
	async findAll(id: number) {
		const income = await this.incomeRepository.find({
			where: {
				user: {
					id,
				},
			},
		})

		return income
	}

	// Find One Income
	async findOne(id: number, userId: number) {
		const isExist = await this.incomeRepository.findOneBy({
			id,
			user: {
				id: userId,
			},
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return await this.incomeRepository.find({
			where: { id },
		})
	}

	// Update Income
	async update(id: number, updateIncomeDto: UpdateIncomeDto) {
		const isExist = await this.incomeRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return await this.incomeRepository.update(id, updateIncomeDto)
	}

	// Delete Income
	async remove(id: number) {
		const isExist = await this.incomeRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return await this.incomeRepository.delete(id)
	}
}
