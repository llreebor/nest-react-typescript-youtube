import { useEffect, useState } from 'react'
import { IncomeService } from '../services/income.service'
import { ICategory } from '../types/types'

const BudgetForm = () => {
	const [categories, setCategories] = useState<ICategory[]>([])
	const getCategoriesHandler = async () => {
		const data = await IncomeService.getCategories()

		setCategories(data)
	}

	useEffect(() => {
		getCategoriesHandler()
	}, [])

	return (
		<div className='rounded-md bg-slate-800 mt-10 p-10'>
			<form className='grid grid-cols-1 gap-5'>
				<label htmlFor='title'>
					Title
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title'
						name='title'
					/>
				</label>
				<label htmlFor='sum'>
					Summary
					<input
						className='input flex w-full'
						type='number'
						placeholder='Summary'
						name='sum'
					/>
				</label>
				<label htmlFor='category'>
					Category
					<select
						className='input flex w-full'
						name='category'
						placeholder='Select category'>
						{categories &&
							categories.map((ctg, idx) => (
								<option key={idx} value={ctg.id}>
									{ctg.title}
								</option>
							))}
					</select>
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
