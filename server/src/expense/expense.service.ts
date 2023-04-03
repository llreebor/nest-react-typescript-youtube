import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Expense } from './entities/expense.entity'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'

@Injectable()
export class ExpenseService {
	constructor(
		@InjectRepository(Expense)
		private readonly expenseRepository: Repository<Expense>,
	) {}

	// Create Income
	async create(createExpenseDto: CreateExpenseDto) {
		const newIncome = this.expenseRepository.create(createExpenseDto)
		return this.expenseRepository.save(newIncome)
	}

	// Find All Incomes
	async findAll(id: number) {
		return await this.expenseRepository.find({
			where: {
				user: {
					id,
				},
			},
		})
	}

	// Find One Income
	async findOne(id: number, userId: number) {
		const isExist = await this.expenseRepository.findOneBy({
			id,
			user: {
				id: userId,
			},
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return await this.expenseRepository.find({
			where: { id },
		})
	}

	// Update Income
	async update(id: number, updateExpenseDto: UpdateExpenseDto) {
		const isExist = await this.expenseRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return await this.expenseRepository.update(id, updateExpenseDto)
	}

	// Delete Income
	async remove(id: number) {
		const isExist = await this.expenseRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Income not found')

		return await this.expenseRepository.delete(id)
	}
}
