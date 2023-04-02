import { FC, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Expenses from './pages/Expenses'
import Home from './pages/Home'
import Incomes from './pages/Incomes'
import Layout from './pages/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { useAppDispatch } from './store/hooks'
import { login, logout } from './store/user/userSlice'
import { getTokenFromLocalStorage } from './helpers/localStorage'
import { AuthService } from './services/auth.service'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'incomes',
				element: (
					<ProtectedRoute>
						<Incomes />
					</ProtectedRoute>
				),
			},
			{
				path: 'expenses',
				element: (
					<ProtectedRoute>
						<Expenses />
					</ProtectedRoute>
				),
			},
		],
	},

	{
		path: 'login',
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'registration',
		element: <Registration />,
		errorElement: <ErrorPage />,
	},
])

const App: FC = () => {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		try {
			const token = getTokenFromLocalStorage()

			if (token) {
				const data = await AuthService.getMe()
				dispatch(
					login({
						id: data.id,
						email: data.email,
						token,
					})
				)
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

	return <RouterProvider router={router} />
}

export default App
