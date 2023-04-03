import { instance } from '../api/axios.api'
import { IIncome } from '../types/types'

export async function findAllIncomes(): Promise<IIncome[]> {
	const { data } = await instance.get('/income')
	return data
}
