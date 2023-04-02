import { Income } from 'src/income/entities/income.entity'
import { User } from 'src/user/entity/user.entity'

export class CreateCategoryDto {
	title: string
	user?: User
	incomes?: Income[]
}
