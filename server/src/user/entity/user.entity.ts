import { Category } from 'src/category/entities/category.entity'
import { Income } from 'src/income/entities/income.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn({
		name: 'user_id',
	})
	id: number

	@Column()
	email: string

	@Column()
	password: string

	@OneToMany(() => Income, (income) => income.user)
	@JoinColumn({ name: 'income_id' })
	income: Income[]

	@OneToMany(() => Category, (category) => category.id)
	category: Category[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
