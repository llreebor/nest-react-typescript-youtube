import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

export const IncomeService = {
	// Get All Categories
	async getCategories(): Promise<ICategory[]> {
		const { data } = await instance.get('/category')
		return data
	},
}
