import { IIncome } from '../types/types'
import { useLoaderData } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import BudgetForm from '../components/BudgetForm'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect } from 'react'
import { fillIncome, removeIncome } from '../store/user/userSlice'
import { IncomeService } from '../services/income.service'
import { toast } from 'react-toastify'

const Incomes = () => {
	const incomes = useLoaderData() as IIncome[]
	const state: IIncome[] = useAppSelector((state) => state.user.incomes)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fillIncome(incomes))
	}, [dispatch])

	const removeIncomeHandler = (id: number) => {
		IncomeService.removeIncome(id)
		dispatch(removeIncome(id))
		toast.success('Income deleted..')
	}

	return (
		<>
			<BudgetForm />
			{state.length > 0 && (
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
							{state &&
								state.map((income, idx) => (
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
											<button
												onClick={() =>
													removeIncomeHandler(
														income.id!
													)
												}
												className='btn btn-red flex'>
												<FaTrash />
											</button>
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

export default Incomes
