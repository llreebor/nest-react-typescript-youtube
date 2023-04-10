import { FC, useEffect, useState } from 'react'
import formatDate from '../helpers/date.helper'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoaderData, ITransaction } from '../types/types'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'
import { formatToDollar } from '../helpers/currency.helper'

interface IProps {
	page?: number
	limit?: number
}

const ResultTable: FC<IProps> = ({ page = 1, limit = 1 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoaderData
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [data, setData] = useState<ITransaction[]>([])

	const fetchData = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination/?page=${page}&limit=${limit}`
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchData(currentPage)
	}, [currentPage, transactions])

	return (
		<>
			<ReactPaginate
				className='flex gap-3 justify-end mt-4 items-center'
				activeLinkClassName='bg-blue-500'
				pageLinkClassName='text-white  text-xs py-1 px-2 bg-slate-800 rounded-sm'
				previousClassName={
					'text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				}
				nextClassName={
					'text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				}
				disabledClassName='text-white/50 cursor-not-allowed'
				disabledLinkClassName='text-slate-600 cursor-not-allowed opacity-50'
				pageCount={totalPages} // общее количество страниц
				pageRangeDisplayed={1} // количество отображаемых страниц
				marginPagesDisplayed={2} // количество страниц на краях
				onPageChange={handlePageChange} // обработчик клика на страницу
			/>
			<div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
				<table className='w-full '>
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
						{data?.map((transaction, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td
									className={
										transaction.type === 'income'
											? 'text-green-500'
											: 'text-red-500'
									}>
									{transaction.title}
								</td>
								<td
									className={
										transaction.type === 'income'
											? 'text-green-500'
											: 'text-red-500'
									}>
									{transaction.type === 'income'
										? `+ ${formatToDollar.format(
												transaction.amount
										  )}`
										: `- ${formatToDollar.format(
												transaction.amount
										  )}`}
								</td>
								<td>
									{transaction.category?.title || 'Other'}
								</td>

								<td>
									{formatDate(String(transaction.createdAt))}
								</td>
								<td className='flex justify-end'>
									<Form
										method='delete'
										action={`/transactions`}
										replace>
										<input
											type='hidden'
											name='id'
											defaultValue={transaction.id}
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
