import { FC, useEffect, useState } from 'react'
import formatDate from '../helpers/date.helper'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IIncome, IResponseIncomeLoaderData } from '../types/types'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface IProps {
	page?: number
	limit?: number
	type: string
}

const ResultTable: FC<IProps> = ({ page = 1, limit = 1, type }) => {
	const { incomes } = useLoaderData() as IResponseIncomeLoaderData
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [data, setData] = useState<IIncome[]>([])

	const fetchData = async (page: number) => {
		const response = await instance.get(
			`/${type}/pagination/?page=${page}&limit=${limit}`
		)
		setData(response.data)
		setTotalPages(Math.ceil(incomes.length / limit))
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchData(currentPage)
	}, [currentPage, incomes])

	return (
		<>
			<ReactPaginate
				className='flex gap-3 justify-end mt-5 items-center'
				pageLinkClassName='text-white/50 text-xs py-1 px-2 bg-slate-800 rounded-sm'
				activeLinkClassName='text-white/100 bg-blue-600'
				previousClassName={
					'text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				}
				nextClassName={
					'text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				}
				disabledClassName='bg-slate-300 text-slate-600 cursor-not-allowed opacity-50'
				disabledLinkClassName='bg-slate-300 text-slate-600 cursor-not-allowed opacity-50'
				pageCount={totalPages} // общее количество страниц
				pageRangeDisplayed={1} // количество отображаемых страниц
				marginPagesDisplayed={2} // количество страниц на краях
				onPageChange={handlePageChange} // обработчик клика на страницу
			/>
			<div className='bg-slate-800 px-4 py-3 mt-5 rounded-md'>
				<table className='w-full mt-4'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Title</td>
							<td className='font-bold'>Amount ($)</td>
							<td className='font-bold'>Category</td>
							<td className='font-bold'>Date</td>
							<td className='text-right'>Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((income, idx) => (
							<tr key={idx}>
								<td className='text-sm text-white/50'>
									{idx + 1}
								</td>
								<td className='text-sm text-white/50'>
									{income.title}
								</td>
								<td className='text-sm text-white/50'>
									{income.amount}
								</td>
								<td className='text-sm text-white/50'>
									{income.category?.title || 'Other'}
								</td>

								<td className='text-sm text-white/50'>
									{formatDate(String(income.createdAt))}
								</td>
								<td className='flex justify-end'>
									<Form
										method='delete'
										action={`/incomes`}
										replace>
										<input
											type='hidden'
											name='id'
											defaultValue={income.id}
										/>

										<button className='btn flex p-2 hover:btn-red'>
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default ResultTable
