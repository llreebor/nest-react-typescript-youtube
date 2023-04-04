import { IIncome } from '../types/types'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import BudgetForm from '../components/BudgetForm'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'

const Incomes = () => {
	const incomes = useLoaderData() as IIncome[]

	return (
		<>
			<BudgetForm type='incomes' />
			{incomes.length > 0 && (
				<div className=' bg-slate-800 rounded-md p-5 mt-10'>
					<table className='w-full'>
						<thead>
							<tr>
								<td className='text-left'>№</td>
								<td className='text-left'>Title</td>
								<td className='text-left'>Sum</td>
								<td className='text-right'>Date</td>
								<td className='text-right'>Actions</td>
							</tr>
						</thead>
						<tbody>
							{incomes.map((income, idx) => (
								<tr key={idx}>
									<td className='py-2'>{idx + 1}</td>
									<td className='py-2'>{income.title}</td>
									<td className='py-2'>{income.sum}</td>
									<td className='py-2 text-right'>
										{income.createdAt}
									</td>
									<td className='py-2 flex justify-end gap-2'>
										<button className='btn btn-green flex'>
											<FaEdit />
										</button>

										<Form
											method='delete'
											action={`/incomes`}
											replace>
											<button className='btn btn-red flex'>
												<FaTrash />
												<input
													type='hidden'
													name='id'
													defaultValue={income.id}
												/>
											</button>
										</Form>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	)
}

export const incomeLoader = async (): Promise<IIncome[]> => {
	const { data } = await instance.get('/incomes')
	return data
}

export const incomeAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newIncome = {
				title: formData.get('title'),
				sum: formData.get('amount'),
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
			console.log(incomeId)

			await instance.delete(`/incomes/${incomeId.id}`)
			toast.success('Income deleted.')
			return redirect('/incomes')
		}
	}
}

export default Incomes
