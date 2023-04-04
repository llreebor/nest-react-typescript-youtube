import { FC } from 'react'
import { Form } from 'react-router-dom'

interface IBudgetForm {
	type: 'incomes' | 'expenses'
}

const BudgetForm: FC<IBudgetForm> = ({ type }) => {
	return (
		<div className='rounded-md bg-slate-800 mt-10 p-10 grid grid-cols-1 gap-10'>
			<Form
				className='grid grid-cols-1 gap-5'
				method='post'
				action={`/${type}`}>
				<label htmlFor='title'>
					Title
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title...'
						name='title'
						defaultValue={''}
					/>
				</label>
				<label htmlFor='amount'>
					Amount
					<input
						className='input flex w-full'
						type='number'
						placeholder='Amount...'
						name='amount'
						defaultValue={''}
					/>
				</label>
				<button type='submit' className='btn btn-green flex max-w-fit'>
					Submit
				</button>
			</Form>
		</div>
	)
}

export default BudgetForm
