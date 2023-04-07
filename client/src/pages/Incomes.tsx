import {
	ICategory,
	ICategoryIncome,
	IIncome,
	IResponseIncomeLoaderData,
} from '../types/types'
import { redirect, useLoaderData } from 'react-router-dom'
import BudgetForm from '../components/BudgetForm'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import ResultTable from '../components/ResultTable'
import { formatToDollar } from '../helpers/currency.helper'
import { useState } from 'react'

export const incomeLoader = async () => {
	const incomes = await instance.get<IIncome[]>('/incomes')
	const categories = await instance.get<ICategory[]>('/categories')
	const total = await instance.get<number>('/categories/total')
	const byCategory = await instance.get<ICategoryIncome>(
		'/categories/by-category'
	)

	const lodaderData = {
		incomes: incomes.data,
		categories: categories.data,
		totalIncomes: total.data,
		byCategory: byCategory.data,
	}

	return lodaderData
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
	const { incomes, totalIncomes, byCategory } =
		useLoaderData() as IResponseIncomeLoaderData

	const [current, setCurrent] = useState<number>(0)

	return (
		<>
			<div className='grid grid-cols-3 gap-5 mt-5 '>
				<div className='grid col-span-2'>
					<BudgetForm type='incomes' />
				</div>

				<div className='grid grid-cols-2 gap-5'>
					<div className='rounded-md bg-slate-800 p-4 flex flex-col gap-3'>
						<div className='uppercase text-md font-bold text-center'>
							Total Income:
						</div>
						<div className='bg-blue-600 p-1 rounded-sm text-center'>
							{formatToDollar.format(totalIncomes)}
						</div>
					</div>

					<div className='rounded-md bg-slate-800 p-4 '>
						<small>Разница доход / расход</small>
					</div>

					<div className='rounded-md bg-slate-800 p-4 col-span-2'>
						<div className='uppercase text-md font-bold text-center'>
							by Category
						</div>
						<div className='flex flex-wrap gap-2 mt-3 justify-center'>
							{byCategory.map((item, idx) => (
								<button
									onClick={() => setCurrent(item.total)}
									className=' p-1 rounded-sm text-white/50 hover:text-white'
									key={idx}>
									{item.title}
								</button>
							))}
						</div>
						<div className='bg-blue-600 p-1 rounded-sm text-center mt-3'>
							{current ? (
								<>{formatToDollar.format(current)} </>
							) : (
								'Choose category'
							)}
						</div>
					</div>
				</div>
			</div>

			{incomes.length > 0 && (
				<ResultTable type='incomes' page={1} limit={5} />
			)}
		</>
	)
}

export default Incomes
