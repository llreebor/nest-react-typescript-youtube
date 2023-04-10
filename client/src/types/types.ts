export interface IUser {
	id: string | null
	email: string | null
	token: string
}

export interface IToken {
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseDataUser {
	createdAt: string | undefined
	email: string | undefined
	password: string | undefined
	updatedAt: string | undefined
	__v: number | undefined
	_id: string | undefined
	message: string | undefined
}

export interface ITransaction {
	title: string
	amount: number
	type: string | null
	id?: number
	category?: ICategory
	createdAt?: string
	updatedAt?: string
}

export interface ICategory {
	id?: number
	type?: 'income' | 'expense'
	title: string
	createdAt?: string
	updatedAt?: string
}

export interface ICategoryTransaction {
	title: string
	total: number
	transactions: ITransaction[]
}

export interface IResponseTransactionLoaderData {
	transactions: ITransaction[]
	categories: ICategory[]
	totalIncomes: number
	totalExpenses: number
	byCategory: ICategoryTransaction[]
}

export interface IBudgetForm {
	type: 'incomes' | 'expenses'
}

export interface IBudgetFormWIthPaginate {
	type: IBudgetForm
	page?: number
	limit?: number
}
