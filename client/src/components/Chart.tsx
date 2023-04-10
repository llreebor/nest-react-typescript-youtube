import { useLoaderData } from 'react-router-dom'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { IResponseTransactionLoaderData } from '../types/types'

const COLORS = ['#00C49F', '#FF8042']

interface IData {
	value: number
	name: string
}

const Chart = () => {
	const { totalIncomes, totalExpenses } =
		useLoaderData() as IResponseTransactionLoaderData

	const data = new Array<IData>(
		{ value: totalIncomes, name: 'Incomes' },
		{ value: totalExpenses, name: 'Expense' }
	)

	return (
		<PieChart width={240} height={240}>
			<Pie
				data={data}
				cx={'50%'}
				cy={'50%'}
				innerRadius={60}
				outerRadius={80}
				fill='#8884d8'
				paddingAngle={2}
				dataKey='value'>
				{data.map((entry, idx) => (
					<Cell key={idx} fill={COLORS[idx % COLORS.length]} />
				))}
			</Pie>
			<Legend />
			<Tooltip />
		</PieChart>
	)
}

export default Chart
