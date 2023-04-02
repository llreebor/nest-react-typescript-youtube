import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { setTokenToLocalStorage } from '../helpers/localStorage'
import { AuthService } from '../services/auth.service'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))

				toast.success('You logged in!', {
					position: 'bottom-right',
				})

				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString(), {
				closeOnClick: true,
				theme: 'dark',
			})
		}
	}

	return (
		<div className='min-h-screen flex flex-col justify-center items-center bg-slate-900 font-roboto text-white'>
			<div className='container'>
				<h1 className='text-center text-xl mb-10'>Login</h1>
				<form
					onSubmit={onSubmit}
					className='flex w-1/3 flex-col mx-auto gap-5'>
					<input
						className='bg-transparent py-2 px-4 border border-slate-800 rounded-md outline-none focus:border-slate-300'
						type='text'
						placeholder='Email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className='bg-transparent py-2 px-4 border border-slate-800 rounded-md outline-none focus:border-slate-300'
						type='text'
						placeholder='Password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className='flex items-center gap-10 justify-between'>
						<button
							type='submit'
							className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>
							Login
						</button>

						<Link
							to={'/registration'}
							className='text-slate-300 hover:text-white'>
							No account yet?
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
