import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ErrorPage from '../pages/ErrorPage'
import Expenses from '../pages/Expenses'
import Home from '../pages/Home'
import Incomes, { incomeAction, incomeLoader } from '../pages/Incomes'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Registration from '../pages/Registration'

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
