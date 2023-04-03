import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateExpenseDto {
	title: string
	sum: number
	user?: User
	categories?: Category[]
}
