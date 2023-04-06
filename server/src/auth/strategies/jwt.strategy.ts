import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IUser } from '../types/user.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'sjdhgv67tcr674cfr236tcfrf73ywcfs7634ct',
		})
	}

	async validate(user: IUser) {
		return { id: user.id, email: user.email }
	}
}
