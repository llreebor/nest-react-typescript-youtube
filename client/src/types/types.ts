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
