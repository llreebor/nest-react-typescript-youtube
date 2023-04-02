import { Link } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localStorage'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { FaSignOutAlt, FaBtc } from 'react-icons/fa'
const Header = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('You logged out!', {
			position: 'bottom-right',
		})
	}

	return (
		<div className='flex items-center justify-between p-5 shadow-sm bg-slate-800 backdrop-blur-sm'>
			<Link to='/'>
				<FaBtc size={30} />
			</Link>

			{isAuth && (
				<ul className='flex items-center gap-10 ml-auto mr-10'>
					<li>
						<Link
							className='text-slate-300 hover:text-white'
							to='/'>
							Home
						</Link>
					</li>
					<li>
						<Link
							className='text-slate-300 hover:text-white'
							to='/incomes'>
							Incomes
						</Link>
					</li>
					<li>
						<Link
							className='text-slate-300 hover:text-white'
							to='/expenses'>
							Expenses
						</Link>
					</li>
				</ul>
			)}

			{isAuth ? (
				<button
					onClick={logoutHandler}
					className='flex gap-2 items-center text-sm text-white hover:text-white  bg-rose-900 hover:bg-rose-800 py-2 px-4 rounded-md'>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link to={'login'} className='text-slate-300 hover:text-white '>
					Log In / Registration
				</Link>
			)}
		</div>
	)
}

export default Header
