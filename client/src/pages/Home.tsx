import { useEffect, useState } from 'react'
import { instance } from '../api/axios.api'

function Home() {
	const [categories, setCategories] = useState([])
	const getCategories = async () => {
		const { data } = await instance.get('/categories')
		setCategories(data)
	}

	useEffect(() => {
		getCategories()
	}, [])
	return (
		<h1 className='text-3xl font-bold underline leading-none m-0'>
			{categories &&
				categories.map((category, idx) => (
					<li key={idx}>{category.title}</li>
				))}
		</h1>
	)
}

export default Home
