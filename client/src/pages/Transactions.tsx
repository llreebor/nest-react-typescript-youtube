import {
	ICategory,
	ICategoryTransaction,
	IResponseTransactionLoaderData,
	ITransaction,
} from '../types/types'
import { redirect, useLoaderData } from 'react-router-dom'
import BudgetForm from '../components/TransactionForm'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import ResultTable from '../components/ResultTable'
import { formatToDollar } from '../helpers/currency.helper'
import { useState } from 'react'

export const transactionsLoader = async () => {
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const categories = await instance.get<ICategory[]>('/categories')
	const totalIncomes = await instance.get<number>('/transactions/income/find')
	const totalExpenses = await instance.get<number>(
		'/transactions/expense/find'
	)
	const byCategory = await instance.get<ICategoryTransaction>(
		'/categories/by-category'
	)

	const lodaderData = {
		transactions: transactions.data,
		categories: categories.data,
		totalIncomes: totalIncomes.data,
		totalExpenses: totalExpenses.data,
		byCategory: byCategory.data,
	}

	console.log(byCategory.data)

	return lodaderData
}

export const transactionsAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()

			const newTransaction = {
				title: formData.get('title'),
				amount: formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}

			console.log(newTransaction)

			await instance.post('/transactions', newTransaction)

			toast.success('Income created.')
			return redirect('/transactions')
		}

		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = {
				id: formData.get('id'),
			}
			await instance.delete(
				`/transactions/transaction/${transactionId.id}`
			)
			toast.success('Transaction deleted.')
			return redirect('/transactions')
		}
	}
}

const Transactions = () => {
	const { transactions, totalIncomes, totalExpenses, byCategory } =
		useLoaderData() as IResponseTransactionLoaderData

	const [searchParams, setSearchParams] = useState<string>('')

	return (
		<>
			<div className='grid grid-cols-3 gap-4 mt-4 '>
				<div className='grid col-span-2'>
					<BudgetForm />
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div className='rounded-md bg-slate-800 p-3 flex flex-col gap-3'>
						<div className='uppercase text-md font-bold text-center'>
							Total Income:
						</div>
						<div className='bg-green-600 p-1 rounded-sm text-center'>
							{formatToDollar.format(totalIncomes)}
						</div>

						<div className='uppercase text-md font-bold text-center'>
							Total Expense:
						</div>
						<div className='bg-red-500 p-1 rounded-sm text-center'>
							{formatToDollar.format(totalExpenses)}
						</div>
					</div>

					<div className='rounded-md bg-slate-800 p-3 '>
						<small>Разница доход / расход</small>
					</div>

					<div className='rounded-md bg-slate-800 p-3 col-span-2'>
						<div className='uppercase text-md font-bold text-center'>
							Search by title
						</div>
						<div className='flex flex-wrap gap-2 mt-3 justify-center'>
							<input
								type='search'
								className='input flex w-full'
								placeholder='Search...'
								onChange={(e) =>
									setSearchParams(e.target.value)
								}
							/>
						</div>
					</div>
				</div>
			</div>

			{transactions.length > 0 && <ResultTable page={1} limit={5} />}
		</>
	)
}

export default Transactions
