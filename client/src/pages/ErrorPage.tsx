import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/page_not_found.png'

export default function ErrorPage() {
	const error = useRouteError()

	return (
		<div className='min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
			<img src={img} alt='img' className='w-80' />
			<Link
				className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'
				to='/'>
				Back
			</Link>
		</div>
	)
}
