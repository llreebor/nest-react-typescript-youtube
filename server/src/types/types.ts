import { IUser } from 'src/auth/types/user.type'
import { Transaction } from 'src/transaction/entities/transaction.entity'

export interface RequestUser {
	user: IUser
}

export interface IByCategory {
	title: string
	total: number
	transactions: Transaction[]
}
