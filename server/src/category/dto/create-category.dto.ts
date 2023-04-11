import { IsNotEmpty } from 'class-validator'
import { Transaction } from 'src/transaction/entities/transaction.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateCategoryDto {
	@IsNotEmpty()
	title: string
	user?: User
	transaction?: Transaction
}
