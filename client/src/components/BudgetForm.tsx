import { FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { IBudgetForm, IIncome, IResponseIncomeLoaderData } from '../types/types'

const BudgetForm: FC<IBudgetForm> = ({ type }) => {
	const { categories } = useLoaderData() as IResponseIncomeLoaderData

	return (
		<div className='rounded-md bg-slate-800 mt-10 p-10 grid grid-cols-4 gap-10'>
			<Form
				className='grid grid-cols- col-span-3 gap-5'
				method='post'
				action={`/${type}`}>
				<label htmlFor='title'>
					Title
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title...'
						name='title'
					/>
				</label>
				<label htmlFor='amount'>
					Amount
					<input
						className='input flex w-full'
						type='number'
						placeholder='Amount...'
						name='amount'
					/>
				</label>

				{categories.length ? (
					<label htmlFor='category'>
						Category
						<select className='input flex w-full' name='category'>
							{categories.length &&
								categories.map((ctg, idx) => (
									<option key={idx} value={ctg.id}>
										{ctg.title}
									</option>
								))}
						</select>
					</label>
				) : (
					<h1 className='text-red-300'>
						To continue, create a category first
					</h1>
				)}
				<button
					disabled={!categories.length}
					type='submit'
					className='btn btn-green flex max-w-fit disabled:bg-gray-400 disabled:cursor-not-allowed'>
					Submit
				</button>
			</Form>

			<div>
				<h1>Categories</h1>
				<Form>
					<label htmlFor='title' className='text-sm mt-4 block'>
						Create category
						<input
							className='input flex w-full'
							type='text'
							placeholder='Title...'
							name='new_category'
						/>
						<button
							type='submit'
							className='btn btn-green flex justify-center w-full mt-5'>
							Create Category
						</button>
					</label>
				</Form>
			</div>
		</div>
	)
}

export default BudgetForm
