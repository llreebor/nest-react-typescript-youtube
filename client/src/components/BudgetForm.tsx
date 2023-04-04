import { useState } from 'react'
import { IncomeService } from '../services/income.service'
import { useAppDispatch } from '../store/hooks'
import { addIncome } from '../store/user/userSlice'
import { toast } from 'react-toastify'

const BudgetForm = () => {
	const [title, setTitle] = useState('')
	const [sum, setSum] = useState('')

	const dispatch = useAppDispatch()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = await IncomeService.createIncome({ title, sum: +sum })
		dispatch(addIncome(data))
		setTitle('')
		setSum('')
		toast.success('Income Created')
	}

	return (
		<div className='rounded-md bg-slate-800 mt-10 p-10 grid grid-cols-1 gap-10'>
			<form className='grid grid-cols-1 gap-5' onSubmit={onSubmit}>
				<label htmlFor='title'>
					Title
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title...'
						name='title'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
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
						value={sum}
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
