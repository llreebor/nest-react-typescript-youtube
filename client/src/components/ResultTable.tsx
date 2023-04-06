import React, { FC } from 'react'
import formatDate from '../helpers/date.helper'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IBudgetForm, IResponseIncomeLoaderData } from '../types/types'

const ResultTable: FC<IBudgetForm> = ({ type }) => {
	const { incomes } = useLoaderData() as IResponseIncomeLoaderData

	return (
		<table className='w-full'>
			<thead>
				<tr>
					<td className='font-bold'>№</td>
					<td className='font-bold'>Title</td>
					<td className='font-bold'>Amount</td>
					<td className='font-bold'>Category</td>
					<td className='font-bold'>Date</td>
					<td className='text-right'>Actions</td>
				</tr>
			</thead>
			<tbody>
				{incomes?.map((income, idx) => (
					<tr key={idx}>
						<td className='text-sm text-white/50'>{idx + 1}</td>
						<td className='text-sm text-white/50'>
							{income.title}
						</td>
						<td className='text-sm text-white/50'>
							{income.amount}
						</td>
						<td className='text-sm text-white/50'>
							{income.category?.title}
						</td>

						<td className='text-sm text-white/50'>
							{formatDate(String(income.createdAt))}
						</td>
						<td className='flex justify-end gap-2'>
							<Form method='patch' action={`/${type}`} replace>
								<button className='btn btn-green flex'>
									<FaEdit />
									<input
										type='hidden'
										name='id'
										defaultValue={income.id}
									/>
								</button>
							</Form>

							<Form method='delete' action={`/incomes`} replace>
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
	)
}

export default ResultTable
