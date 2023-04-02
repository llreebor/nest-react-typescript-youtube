import { Income } from 'src/income/entities/income.entity'
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
export class Category {
	@PrimaryGeneratedColumn({ name: 'category_id' })
	id: number

	@Column({ unique: true })
	title: string

	@ManyToOne(() => User, (user) => user.category)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToMany(() => Income, (income) => income.categories)
	incomes: Income[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
