import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
	Query,
} from '@nestjs/common'
import { IncomeService } from './income.service'
import { CreateIncomeDto } from './dto/create-income.dto'
import { UpdateIncomeDto } from './dto/update-income.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guards/author.guard'

@Controller('incomes')
export class IncomeController {
	constructor(private readonly incomeService: IncomeService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createIncomeDto: CreateIncomeDto, @Req() req) {
		return this.incomeService.create(createIncomeDto, +req.user.id)
	}

	@Get('')
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.incomeService.findAll(+req.user.id)
	}

	@Get('/pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 3,
	) {
		return this.incomeService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		)
	}

	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.incomeService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
		return this.incomeService.update(+id, updateIncomeDto)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	remove(@Param('id') id: string) {
		return this.incomeService.remove(+id)
	}
}
