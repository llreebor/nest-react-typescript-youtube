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
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ExpenseService } from './expense.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'

@Controller('expense')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createExpenseDto: CreateExpenseDto) {
		return this.expenseService.create(createExpenseDto)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.expenseService.findAll(+req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string, @Req() req) {
		return this.expenseService.findOne(+id, req.user.id)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	update(
		@Param('id') id: string,
		@Body() updateExpenseDto: UpdateExpenseDto,
	) {
		return this.expenseService.update(+id, updateExpenseDto)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.expenseService.remove(+id)
	}
}
