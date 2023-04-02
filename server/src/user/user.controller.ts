import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/me')
	getMe(@Request() req) {
		return req.user
	}
}
