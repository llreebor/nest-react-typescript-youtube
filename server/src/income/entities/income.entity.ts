import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entity/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Income {
	@PrimaryGeneratedColumn({ name: 'income_id' })
	id: number

	@Column()
	title: string

	@Column()
	amount: number

	@ManyToOne(() => Category, (category) => category.incomes, {
		onDelete: 'SET NULL',
	})
	@JoinColumn({ name: 'category_id' })
	category: Category

	@ManyToOne(() => User, (user) => user.incomes)
	@JoinColumn({ name: 'user_id' })
	user: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
