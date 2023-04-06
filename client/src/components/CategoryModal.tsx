import React, { FC } from 'react'
import { Form } from 'react-router-dom'

interface ICategoryModal {
	type: 'post' | 'patch'
	id: number
	setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
			<Form
				className='grid grid-cols- col-span-3 gap-2 w-[300px] p-5 rounded-md bg-slate-900'
				method={type}
				action={`/categories`}
				onSubmit={() => setVisibleModal(false)}
				replace>
				<label htmlFor='title'>
					<small>Category Title</small>
					<input
						className='input flex w-full'
						type='text'
						placeholder='Title...'
						name='title'
					/>
					<input type='hidden' name='id' defaultValue={id} />
				</label>
				<div className='flex gap-2'>
					<button
						type='submit'
						className='btn btn-green flex max-w-fit disabled:bg-gray-400 disabled:cursor-not-allowed'>
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						className='btn btn-red flex max-w-fit disabled:bg-gray-400 disabled:cursor-not-allowed'>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
