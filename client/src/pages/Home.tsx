import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAppSelector } from '../store/hooks'

function Home() {
	const auth = useAuth()
	const { user } = useAppSelector((state) => state.user)

	return !auth ? (
		<div className='mt-40 p-20 border border-slate-800 max-w-fit mx-auto shadow-sm rounded-md'>
			<h1 className='text-2xl text-center font-semibold'>
				To use the site, you need to log in
			</h1>
			<Link className='btn btn-green max-w-fit mx-auto mt-5' to={'auth'}>
				Press to Join
			</Link>
		</div>
	) : (
		<div className='mt-40 p-20 border border-slate-800 max-w-fit mx-auto shadow-sm rounded-md'>
			<h1 className='text-2xl text-center font-semibold'>
				Hello, <span className='text-blue-500'>{user?.email}</span>
			</h1>
			<Link
				className='btn btn-green max-w-fit mx-auto mt-5'
				to={'transactions'}>
				Keep track of your money
			</Link>
		</div>
	)
}

export default Home
