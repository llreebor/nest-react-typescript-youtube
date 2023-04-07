import { FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { IBudgetForm, IResponseIncomeLoaderData } from '../types/types'
import { FaEdit, FaPlus } from 'react-icons/fa'

const BudgetForm: FC<IBudgetForm> = ({ type }) => {
	const { categories } = useLoaderData() as IResponseIncomeLoaderData
	const [visibleModal, setVisibleModal] = useState(false)

	return (
		<div className='rounded-md bg-slate-800 p-4'>
			{/* Add Income form */}
			<Form className='grid gap-2' method='post' action={`/${type}`}>
				<label htmlFor='title'>
					Title
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title...'
						name='title'
						required
					/>
				</label>
				<label htmlFor='amount'>
					Amount
					<input
						className='input flex w-full'
						type='number'
						placeholder='Amount...'
						name='amount'
						required
					/>
				</label>

				{categories.length ? (
					<label htmlFor='category' className='w-full'>
						Category
						<select
							className='input flex w-full'
							name='category'
							required>
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

				<div>
					<button
						type='button'
						onClick={() => setVisibleModal(!visibleModal)}
						className='max-w-fit flex items-center gap-2 text-white/50 hover:text-white'>
						<FaPlus />
						<span>Create a new category</span>
					</button>
				</div>

				<button
					disabled={!categories.length}
					type='submit'
					className='btn btn-green flex max-w-fit disabled:bg-gray-400 disabled:cursor-not-allowed'>
					Submit
				</button>
			</Form>

			{/* Edit Modal Form */}
			{visibleModal && (
				<div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
					<Form
						className='grid grid-cols- col-span-3 gap-2 w-[300px] p-5 rounded-md bg-slate-900'
						method='post'
						action={`/${type}`}>
						<label htmlFor='title'>
							<small>Category Title</small>
							<input
								className='input flex w-full'
								type='text'
								placeholder='Title...'
								name='title'
							/>
						</label>
						<div className='flex gap-2'>
							<button
								type='submit'
								className='btn btn-green flex max-w-fit disabled:bg-gray-400 disabled:cursor-not-allowed'>
								Create
							</button>
							<button
								onClick={() => setVisibleModal(!visibleModal)}
								className='btn btn-red flex max-w-fit disabled:bg-gray-400 disabled:cursor-not-allowed'>
								Close
							</button>
						</div>
					</Form>
				</div>
			)}
		</div>
	)
}

export default BudgetForm
