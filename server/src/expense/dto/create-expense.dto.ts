import { User } from 'src/user/entity/user.entity'

export class CreateExpenseDto {
	title: string
	sum: number
	user?: User
}
