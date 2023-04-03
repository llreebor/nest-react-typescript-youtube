import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entity/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Expense {
	@PrimaryGeneratedColumn({ name: 'expense_id' })
	id: number

	@Column()
	title: string

	@Column()
	sum: number

	@ManyToOne(() => User, (user) => user.income)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToMany(() => Category, (category) => category.incomes)
	categories: Category[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}