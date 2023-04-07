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

export interface IIncome {
	title: string
	amount: number
	id?: number
	category?: ICategory
	createdAt?: string
	updatedAt?: string
}

export interface ICategory {
	id?: number
	title: string
	createdAt?: string
	updatedAt?: string
}

export interface ICategoryIncome {
	title: string
	total: number
	incomes: IIncome[]
}

export interface IResponseIncomeLoaderData {
	incomes: IIncome[]
	categories: ICategory[]
	totalIncomes: number
	byCategory: ICategoryIncome[]
}

export interface IBudgetForm {
	type: 'incomes' | 'expenses'
}

export interface IBudgetFormWIthPaginate {
	type: IBudgetForm
	page?: number
	limit?: number
}
