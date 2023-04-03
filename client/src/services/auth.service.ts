import { instance } from '../api/axios.api'
import { IUserData, IResponseDataUser, IUser } from '../types/types'

export const AuthService = {
	// Registration
	async registration(
		userData: IUserData
	): Promise<IResponseDataUser | undefined> {
		const { data } = await instance.post<
			IUserData,
			{ data: IResponseDataUser }
		>('user', userData)
		return data
	},
	// Login
	async login(userData: IUserData): Promise<IUser | undefined> {
		const { data } = await instance.post<IUserData, { data: IUser }>(
			'auth/login',
			userData
		)
		return data
	},
	// GetMe
	async getMe() {
		const { data } = await instance.get('user/me')

		if (data) return data
		return
	},
}
