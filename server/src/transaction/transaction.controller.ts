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
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guards/author.guard'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class IncomeController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() CreateTransactionDto: CreateTransactionDto, @Req() req) {
		return this.transactionService.create(
			CreateTransactionDto,
			+req.user.id,
		)
	}

	@Get(':type/find')
	@UseGuards(JwtAuthGuard)
	findAllByType(@Req() req, @Param('type') type: string) {
		return this.transactionService.findAllByType(+req.user.id, type)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.transactionService.findAll(+req.user.id)
	}

	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 3,
	) {
		return this.transactionService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		)
	}

	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(
		@Param('id') id: string,
		@Body() UpdateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionService.update(+id, UpdateTransactionDto)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	remove(@Param('id') id: string) {
		return this.transactionService.remove(+id)
	}
}
