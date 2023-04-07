import { IUser } from 'src/auth/types/user.type'
import { Income } from 'src/income/entities/income.entity'

export interface RequestUser {
	user: IUser
}

export interface IByCategory {
	title: string
	total: number
	incomse: Income[]
}
