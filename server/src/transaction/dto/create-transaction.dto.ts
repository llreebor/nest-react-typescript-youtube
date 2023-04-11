import { IsNotEmpty, IsNumber } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateTransactionDto {
	@IsNotEmpty({ message: 'Title must be nore then 1 symbol' })
	title: string
	@IsNumber()
	amount: number
	@IsNotEmpty()
	type: 'expense' | 'income'
	category: Category
	user: User
}
