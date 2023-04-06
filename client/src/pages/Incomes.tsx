import { ICategory, IIncome, IResponseIncomeLoaderData } from '../types/types'
import { redirect, useLoaderData } from 'react-router-dom'
import BudgetForm from '../components/BudgetForm'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import ResultTable from '../components/ResultTable'

export const incomeLoader = async () => {
	const incomes = await instance.get<IIncome[]>('/incomes')
	const categories = await instance.get<ICategory[]>('/categories')
	const data = { incomes: incomes.data, categories: categories.data }

	return data
}

export const incomeAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()

			const newIncome = {
				title: formData.get('title'),
				amount: formData.get('amount'),
				category: formData.get('category'),
			}

			await instance.post('/incomes', newIncome)
			toast.success('Income created.')
			return redirect('/incomes')
		}

		case 'DELETE': {
			const formData = await request.formData()
			const incomeId = {
				id: formData.get('id'),
			}
			await instance.delete(`/incomes/income/${incomeId.id}`)
			toast.success('Income deleted.')
			return redirect('/incomes')
		}
	}
}

const Incomes = () => {
	const { incomes } = useLoaderData() as IResponseIncomeLoaderData

	return (
		<>
			<BudgetForm type='incomes' />
			{incomes.length > 0 && (
				<div className=' bg-slate-800 rounded-md p-5 mt-10'>
					<ResultTable type='incomes' />
				</div>
			)}
		</>
	)
}

export default Incomes
