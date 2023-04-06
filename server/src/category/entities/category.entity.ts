import { Income } from 'src/income/entities/income.entity'
import { User } from 'src/user/entity/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Category {
	@PrimaryGeneratedColumn({ name: 'category_id' })
	id: number

	@Column()
	title: string

	@OneToMany(() => Income, (income) => income.category)
	@JoinColumn({ name: 'income_id' })
	incomes: Income[]

	@ManyToOne(() => User, (user) => user.categories)
	@JoinColumn({ name: 'user_id' })
	user: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
