import { useAppSelector } from '../store/hooks'

function App() {
	const email = useAppSelector((state) => state.user.user?.email)

	return (
		<h1 className='text-3xl font-bold underline leading-none m-0'>
			Main Page
		</h1>
	)
}

export default App
