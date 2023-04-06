import { Category } from 'src/category/entities/category.entity'
import { Income } from 'src/income/entities/income.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	password: string

	@OneToMany(() => Category, (category) => category.user)
	categories: Category[]

	@OneToMany(() => Income, (income) => income.user)
	incomes: Income[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
