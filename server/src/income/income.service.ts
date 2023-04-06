import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
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
	async create(createIncomeDto: CreateIncomeDto, id: number) {
		const newIncome = {
			title: createIncomeDto.title,
			amount: createIncomeDto.amount,
			category: { id: +createIncomeDto.category },
			user: { id },
		}

		if (newIncome) return this.incomeRepository.save(newIncome)

		console.log(newIncome)

		throw new BadRequestException('Vasya')
	}

	// Find All Incomes
	async findAll(id: number) {
		const incomes = await this.incomeRepository.find({
			where: {
				user: {
					id,
				},
			},
			relations: {
				category: true,
				user: true,
			},
		})

		return incomes
	}

	// Find One Income
	async findOne(id: number) {
		const isExist = await this.incomeRepository.findOne({
			where: {
				id,
			},
			relations: {
				user: true,
			},
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return isExist
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
