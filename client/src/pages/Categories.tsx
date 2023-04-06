import React, { useState } from 'react'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import CategoryModal from '../components/CategoryModal'

export const categoriesLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const category = {
				title: formData.get('title'),
			}
			await instance.post('/categories', category)

			return redirect('/categories')
		}

		case 'DELETE': {
			const formData = await request.formData()
			const categoryId = formData.get('id')

			await instance.delete(`/categories/category/${categoryId}`)
			return redirect('/categories')
		}

		case 'PATCH': {
			const formData = await request.formData()
			const category = {
				id: formData.get('id'),
				title: formData.get('title'),
			}

			await instance.patch(
				`/categories/category/${category.id}`,
				category
			)
			return redirect('/categories')
		}
	}
}

const Categories = () => {
	const categories = useLoaderData() as ICategory[]
	const [visibleModal, setVisibleModal] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<number>(0)
	const [isEdit, setIsEdit] = useState(false)

	return (
		<>
			<div className='mt-10 p-4 rounded-lg bg-slate-800'>
				<h1>Your categories list:</h1>
				<div className='mt-2 flex items-center flex-wrap gap-2'>
					{categories.map((category, idx) => (
						<div
							key={idx}
							className='group py-2 px-4 rounded-lg bg-blue-800 flex items-center gap-2 relative'>
							{category.title}
							<div className='absolute px-3  left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between hidden group-hover:flex'>
								<button
									onClick={() => {
										setVisibleModal(true)
										setIsEdit(true)
										setCategoryId(Number(category.id))
									}}>
									<AiFillEdit />
								</button>
								{/* Delete Category */}
								<Form
									className='flex'
									method='delete'
									replace
									action={`/categories`}>
									<input
										type='hidden'
										name='id'
										value={category.id}
									/>
									<button>
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>

				<button
					type='button'
					onClick={() => {
						setVisibleModal(true)
						setIsEdit(false)
					}}
					className='max-w-fit flex items-center gap-2 text-white/50 hover:text-white mt-5'>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>

			{/* Add Category */}
			{visibleModal && (
				<CategoryModal
					type='post'
					id={categoryId}
					setVisibleModal={setVisibleModal}
				/>
			)}

			{/* Edit Category */}
			{visibleModal && isEdit && (
				<CategoryModal
					type='patch'
					id={categoryId}
					setVisibleModal={setVisibleModal}
				/>
			)}
		</>
	)
}

export default Categories
