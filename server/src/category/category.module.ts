import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { IncomeService } from 'src/income/income.service'
import { AuthorGuard } from 'src/guards/author.guard'
import { Income } from 'src/income/entities/income.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Category, Income])],
	controllers: [CategoryController],
	providers: [CategoryService, IncomeService],
})
export class CategoryModule {}
