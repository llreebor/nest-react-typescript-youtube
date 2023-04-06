import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateIncomeDto {
	title: string
	amount: number
	category: Category
	user?: User
}
