import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAppDispatch } from './store/hooks'
import { login, logout } from './store/user/userSlice'
import { getTokenFromLocalStorage } from './helpers/localStorage'
import { AuthService } from './services/auth.service'
import { router } from './router/router'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App: FC = () => {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getMe()
				if (data) {
					dispatch(
						login({
							id: data.id,
							email: data.email,
							token,
						})
					)
				}
			} else {
				dispatch(logout())
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
