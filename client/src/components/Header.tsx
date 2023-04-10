import { Link } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localStorage'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { FaSignOutAlt, FaBtc } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Header = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('You logged out!')
	}

	return (
		<div className='flex items-center justify-between px-4 py-2 shadow-sm bg-slate-800 backdrop-blur-sm'>
			<Link to='/'>
				<FaBtc size={20} />
			</Link>

			{isAuth && (
				<ul className='flex items-center gap-5 ml-auto mr-10'>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'text-white' : 'text-white/50'
							}
							to='/'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'text-white' : 'text-white/50'
							}
							to='/transactions'>
							Transactions
						</NavLink>
					</li>

					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'text-white' : 'text-white/50'
							}
							to='/categories'>
							Categories
						</NavLink>
					</li>
				</ul>
			)}

			{isAuth ? (
				<button onClick={logoutHandler} className='btn btn-red'>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link to='auth' className='text-white/50 hover:text-white '>
					Log In / Sign In
				</Link>
			)}
		</div>
	)
}

export default Header
