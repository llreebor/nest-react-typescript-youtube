import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { IUser } from './types/user.type'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findUser(email)

		const passwordIsMatch = await argon2.verify(user.password, password)

		if (user && passwordIsMatch) {
			return user
		}

		throw new BadRequestException('User or password are incorrect!')
	}

	async login(user: IUser) {
		const { email, id } = user

		return {
			id,
			email,
			token: this.jwtService.sign({ id: user.id, email: user.email }),
		}
	}
}
