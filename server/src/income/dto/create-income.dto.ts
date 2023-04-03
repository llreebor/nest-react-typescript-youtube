import { User } from 'src/user/entity/user.entity'

export class CreateIncomeDto {
	title: string
	sum: number
	user?: User
}
