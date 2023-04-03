import { BadRequestException, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entity/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	// Find User
	async findUser(email: string) {
		return await this.userRepository.findOne({ where: { email: email } })
	}

	// Create User
	async createUser(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		})

		if (existUser)
			throw new BadRequestException('This email already exist!')

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
		})

		const token = this.jwtService.sign({ email: createUserDto.email })

		return { user, token }
	}
}
