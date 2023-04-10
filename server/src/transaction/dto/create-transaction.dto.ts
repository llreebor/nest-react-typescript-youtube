import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateTransactionDto {
	title: string
	amount: number
	type: 'expense' | 'income'
	category?: Category
	user?: User
}
