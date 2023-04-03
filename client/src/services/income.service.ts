import { instance } from '../api/axios.api'
import { IIncome } from '../types/types'

export const IncomeService = {
	// Create Income
	async createIncome(incomeData: IIncome) {
		const { data } = await instance.post('/income', incomeData)
		return data
	},
}
