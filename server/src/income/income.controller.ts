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
import { IncomeService } from './income.service'
import { CreateIncomeDto } from './dto/create-income.dto'
import { UpdateIncomeDto } from './dto/update-income.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('incomes')
export class IncomeController {
	constructor(private readonly incomeService: IncomeService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createIncomeDto: CreateIncomeDto, @Req() req) {
		return this.incomeService.create(createIncomeDto, req.user.id)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.incomeService.findAll(+req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string, @Req() req) {
		return this.incomeService.findOne(+id, req.user.id)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
		return this.incomeService.update(+id, updateIncomeDto)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.incomeService.remove(+id)
	}
}
