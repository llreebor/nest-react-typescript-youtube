import { PartialType } from '@nestjs/mapped-types'
import { CreateIncomeDto } from './create-income.dto'
import { User } from 'src/user/entity/user.entity'
import { Category } from 'src/category/entities/category.entity'

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {
	title?: string
	amount?: number
	category?: Category
}
