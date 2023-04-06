import { Module } from '@nestjs/common'
import { IncomeService } from './income.service'
import { IncomeController } from './income.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Income } from './entities/income.entity'
import { Category } from 'src/category/entities/category.entity'
import { CategoryService } from 'src/category/category.service'

@Module({
	imports: [TypeOrmModule.forFeature([Income, Category])],
	controllers: [IncomeController],
	providers: [IncomeService, CategoryService],
})
export class IncomeModule {}
