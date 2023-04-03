import { useState } from 'react'
import { IncomeService } from '../services/income.service'
import { IIncome } from '../types/types'

const BudgetForm = () => {
	const [title, setTitle] = useState('')
	const [sum, setSum] = useState('')
	const addIncome = (data: IIncome) => {
		IncomeService.createIncome({ title, sum: +sum })
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		IncomeService.createIncome({ title, sum: +sum })
	}

	return (
		<div className='rounded-md bg-slate-800 mt-10 p-10 grid grid-cols-4 gap-10'>
			<form
				className='grid grid-cols-1 gap-5 col-span-3'
				onSubmit={onSubmit}>
				<label htmlFor='title'>
					Title
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title...'
						name='title'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label htmlFor='amount'>
					Amount
					<input
						className='input flex w-full'
						type='number'
						placeholder='Amount...'
						name='amount'
						onChange={(e) => setSum(e.target.value)}
					/>
				</label>
				<div className='flex gap-2 w-20'>
					<button className='btn btn-green flex'>Submit</button>

					<button className='btn btn-red flex'>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default BudgetForm
