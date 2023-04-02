import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthService } from '../services/auth.service'

const Registration = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Account has been created', {
					position: 'bottom-right',
				})
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
				<h1 className='text-center text-xl mb-10'>Registration</h1>
				<form
					className='flex w-1/3 flex-col mx-auto gap-5'
					onSubmit={onSubmit}>
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
							Registration
						</button>

						<Link
							to={'/login'}
							className='text-slate-300 hover:text-white'>
							Already have an account?
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Registration
