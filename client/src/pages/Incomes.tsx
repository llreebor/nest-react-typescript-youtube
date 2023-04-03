import { IIncome } from '../types/types'
import { useLoaderData } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import useFormattedDate from '../hooks/useDate'
import BudgetForm from '../components/BudgetForm'

const Incomes = () => {
	const incomes = useLoaderData() as IIncome[]

	return (
		<>
			<BudgetForm />
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
						{incomes &&
							incomes.map((income, idx) => (
								<tr key={idx}>
									<td className='py-2'>{idx + 1}</td>
									<td className='py-2'>{income.title}</td>
									<td className='py-2'>{income.sum}</td>
									<td className='py-2 text-right'>
										{useFormattedDate(income.createdAt)}
									</td>
									<td className='py-2 flex justify-end gap-2'>
										<button className='btn btn-green flex'>
											<FaEdit />
										</button>

										<button className='btn btn-red flex'>
											<FaTrash />
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Incomes
