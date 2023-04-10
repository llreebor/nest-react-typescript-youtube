import { Transaction } from 'src/transaction/entities/transaction.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateCategoryDto {
	title: string
	user?: User
	transaction?: Transaction
}
