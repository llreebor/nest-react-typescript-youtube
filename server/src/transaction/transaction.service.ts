import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'

import { Brackets, Repository } from 'typeorm'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private readonly transactionRepository: Repository<Transaction>,
	) {}

	// Create
	async create(CreateTransactionDto: CreateTransactionDto, id: number) {
		const newTransaction = {
			title: CreateTransactionDto.title,
			amount: CreateTransactionDto.amount,
			category: { id: +CreateTransactionDto.category },
			type: CreateTransactionDto.type,
			user: { id },
		}

		if (newTransaction)
			return this.transactionRepository.save(newTransaction)

		throw new NotFoundException('Something went wrong')
	}

	// // Find All With Pagination
	async findAllWithPagination(id: number, page: number, limit: number) {
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
				createdAt: 'DESC',
			},
			take: limit,
			skip: (page - 1) * limit,
		})

		return transactions
	}

	// Find All
	async findAll(id: number) {
		const transactions = await this.transactionRepository.find({
			where: {
				user: {
					id,
				},
			},
			order: {
				createdAt: 'DESC',
			},
		})

		return transactions
	}

	// Find All By Type
	async findAllByType(id: number, type: string) {
		const transactions = await this.transactionRepository.find({
			where: {
				user: {
					id,
				},
				type,
			},
		})

		const total = transactions.reduce(
			(acc, object) => acc + object.amount,
			0,
		)

		return total
	}

	// Find One
	async findOne(id: number) {
		const isExist = await this.transactionRepository.findOne({
			where: {
				id,
			},
			relations: {
				user: true,
			},
		})

		if (!isExist) throw new NotFoundException('Transaction not found')

		return isExist
	}

	// Update
	async update(id: number, UpdateTransactionDto: UpdateTransactionDto) {
		const isExist = await this.transactionRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Transaction not found')

		return await this.transactionRepository.update(id, UpdateTransactionDto)
	}

	// Delete
	async remove(id: number) {
		const isExist = await this.transactionRepository.findOne({
			where: { id },
		})

		if (!isExist) throw new NotFoundException('Transaction not found')

		return await this.transactionRepository.delete(id)
	}
}
