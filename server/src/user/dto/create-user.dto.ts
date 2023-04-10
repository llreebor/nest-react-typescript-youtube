import { IsEmail, IsOptional, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message:
			'password must be more than 6 characters longust be more then 6 symbols',
	})
	password: string

	@IsOptional()
	token: string
}
