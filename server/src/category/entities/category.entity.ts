import { Transaction } from 'src/transaction/entities/transaction.entity'
import { User } from 'src/user/entity/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Category {
	@PrimaryGeneratedColumn({ name: 'category_id' })
	id: number

	@Column()
	title: string

	@OneToMany(() => Transaction, (transaction) => transaction.category, {
		onDelete: 'SET NULL',
	})
	@JoinColumn({ name: 'transaction_id' })
	transactions: Transaction[]

	@ManyToOne(() => User, (user) => user.categories)
	@JoinColumn({ name: 'user_id' })
	user: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
