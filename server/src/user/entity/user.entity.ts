import { Income } from 'src/income/entities/income.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
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

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
