import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ErrorPage from '../pages/ErrorPage'
import Expenses from '../pages/Expenses'
import Home from '../pages/Home'
import Incomes, { incomeAction, incomeLoader } from '../pages/Incomes'
import Layout from '../pages/Layout'
import Auth from '../pages/Auth'

export const router = createBrowserRouter([
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
				loader: incomeLoader,
				action: incomeAction,
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

			{
				path: 'auth',
				element: <Auth />,
				errorElement: <ErrorPage />,
			},
		],
	},
])
