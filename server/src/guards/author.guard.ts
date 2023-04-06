import {
	Injectable,
	CanActivate,
	ExecutionContext,
	NotFoundException,
} from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { IncomeService } from 'src/income/income.service'

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private incomeService: IncomeService,
		private categoryService: CategoryService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const { id, type } = request.params // получаем id и тип сущности из параметров запроса

		let entity // инициализируем переменную для сущности, которую проверяем

		switch (type) {
			case 'income':
				entity = await this.incomeService.findOne(id) // получаем информацию о доходе из сервиса доходов
				break
			case 'category':
				entity = await this.categoryService.findOne(id) // получаем информацию о категории из сервиса категорий
				break
			default:
				throw new NotFoundException()
		}

		const user = request.user // получаем текущего пользователя из запроса

		if (entity && user && entity.user.id === user.id) {
			// если сущность существует, пользователь аутентифицирован и id пользователя сущности совпадает с id текущего пользователя
			return true // разрешаем доступ к удалению/изменению сущности
		}

		throw new NotFoundException()
	}
}
