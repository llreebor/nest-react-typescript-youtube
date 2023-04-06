import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { setTokenToLocalStorage } from '../helpers/localStorage'
import { AuthService } from '../services/auth.service'

const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLogin, setIsLogin] = useState<boolean>(true)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Account has been created', {
					position: 'bottom-right',
				})

				setIsLogin(!isLogin)
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
		<div className='mt-40 flex flex-col justify-center items-center bg-slate-900 font-roboto text-white'>
			<div className='container'>
				<h1 className='text-center text-xl mb-10'>
					{isLogin ? 'Login' : 'Registration'}
				</h1>

				<form
					onSubmit={isLogin ? loginHandler : registrationHandler}
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
							className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600 mx-auto'>
							Submit
						</button>
					</div>
				</form>

				<div className='flex justify-center mt-5'>
					{isLogin ? (
						<button
							onClick={() => setIsLogin(!isLogin)}
							className='text-slate-300 hover:text-white'>
							You don't have an account?
						</button>
					) : (
						<button
							onClick={() => setIsLogin(!isLogin)}
							className='text-slate-300 hover:text-white'>
							Already have an account?
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Auth
