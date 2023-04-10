import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Auth from '../pages/Auth'
import Categories, {
	categoriesAction,
	categoriesLoader,
} from '../pages/Categories'
import Transactions, {
	transactionsAction,
	transactionsLoader,
} from '../pages/Transactions'

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
				path: 'transactions',
				loader: transactionsLoader,
				action: transactionsAction,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',
				element: <Categories />,
				loader: categoriesLoader,
				action: categoriesAction,
			},
			{
				path: 'auth',
				element: <Auth />,
				errorElement: <ErrorPage />,
			},
		],
	},
])
