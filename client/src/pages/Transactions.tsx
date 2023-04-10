import {
	ICategory,
	IResponseTransactionLoaderData,
	ITransaction,
} from '../types/types'
import { useLoaderData } from 'react-router-dom'
import BudgetForm from '../components/TransactionForm'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import { formatToUSD } from '../helpers/currency.helper'
import Chart from '../components/Chart'
import TransactionTable from '../components/TransactionTable'

export const transactionsLoader = async () => {
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const categories = await instance.get<ICategory[]>('/categories')
	const totalIncomes = await instance.get<number>('/transactions/income/find')
	const totalExpenses = await instance.get<number>(
		'/transactions/expense/find'
	)

	const data = {
		transactions: transactions.data,
		categories: categories.data,
		totalIncomes: totalIncomes.data,
		totalExpenses: totalExpenses.data,
	}

	return data
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
			await instance.post('/transactions', newTransaction)
			toast.success('Income created.')
			return null
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
			return null
		}
	}
}

const Transactions = () => {
	const { transactions, totalIncomes, totalExpenses } =
		useLoaderData() as IResponseTransactionLoaderData

	return (
		<>
			<div className='grid grid-cols-3 gap-4 mt-4 items-start '>
				{/* Add Form */}
				<div className='grid col-span-2'>
					<BudgetForm />
				</div>

				{/* Stats blocks */}
				<div className='rounded-md bg-slate-800 p-3 '>
					<div className='grid grid-cols-2 gap-3 '>
						<div>
							<div className='uppercase text-md font-bold text-center'>
								Total Income:
							</div>
							<div className='bg-green-600 p-1 rounded-sm text-center mt-2'>
								{formatToUSD.format(totalIncomes)}
							</div>
						</div>

						<div>
							<div className='uppercase text-md font-bold text-center'>
								Total Expense:
							</div>
							<div className='bg-red-500 p-1 rounded-sm text-center mt-2'>
								{formatToUSD.format(totalExpenses)}
							</div>
						</div>
					</div>

					{totalExpenses || totalIncomes ? (
						<div className='flex items-center justify-center w-full'>
							<Chart />
						</div>
					) : null}
				</div>
			</div>

			{/* Results */}
			{transactions.length > 0 && <TransactionTable limit={5} />}
		</>
	)
}

export default Transactions
