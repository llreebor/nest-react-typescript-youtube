import { Module } from '@nestjs/common'
import { ExpenseController } from './expense.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Expense } from './entities/expense.entity'
import { ExpenseService } from './expense.service'

@Module({
	imports: [TypeOrmModule.forFeature([Expense])],
	controllers: [ExpenseController],
	providers: [ExpenseService],
})
export class ExpenseModule {}
