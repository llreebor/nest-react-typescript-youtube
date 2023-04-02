import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.register({
			secret: 'sjdhgv67tcr674cfr236tcfrf73ywcfs7634ct',
			signOptions: { expiresIn: '30d' },
		}),
	],
	providers: [UserService],
	exports: [UserService],
	controllers: [UserController],
})
export class UserModule {}
