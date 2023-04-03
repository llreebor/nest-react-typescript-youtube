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
	createdAt: string
	id: number
	sum: number
	title: string
	updatedAt: string
}

export interface ICategory {
	createdAt: string
	id: number
	title: string
	updatedAt: string
}
