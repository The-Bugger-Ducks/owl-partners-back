import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum } from '../../src/modules/user/enums/role.enum';
import { UserController } from '../../src/modules/user/user.controller';
import { PrismaService, User } from '../../src/database';
import { UserService } from '../../src/modules/user/user.service';
import { CreateUserDTO } from '../../src/modules/user/dto/createUser.dto';
import { AuthService } from '../../src/modules/auth/auth.service';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../../src/modules/auth/auth.module';

const mockUsers: User[] = [
	{
		id: "asdasd",
		name: 'John',
		lastName: 'Doe',
		email: 'johndoe@test.com',
		password: '123456',
		role: RoleEnum.SIMPLE,
		createdAt: new Date()
	},
	{
		id: "asdas",
		name: 'Jane',
		lastName: 'Doe',
		email: 'janedoe@test.com',
		password: '123456',
		role: RoleEnum.SIMPLE,
		createdAt: new Date()
	},
];

describe("User", () => {
	let controller: UserController;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [forwardRef(() => AuthModule)],
			controllers: [UserController],
			providers: [UserService, PrismaService],
		}).compile();

		controller = module.get<UserController>(UserController);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	afterEach(async () => await prismaService.$disconnect());

	afterAll(async () => await prismaService.user.deleteMany());

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(prismaService).toBeDefined();
	});


	it('should return a list of users', async () => {
		// Mockando o serviço de usuário para que retorne a lista de usuários que definimos acima.
		jest.spyOn(controller, 'index').mockImplementation(async () => mockUsers);
		// Fazendo uma requisição GET para a rota de busca de usuários.
		const response = await controller.index();
		// Verificando se o resultado da resposta é igual à lista de usuários que definimos acima.
		expect(response).toEqual(mockUsers);
	});



	it('should to create and delete the Jest user', async () => {
		const user: CreateUserDTO = {
			name: "Jest",
			lastName: "Test",
			email: "jest@test.com",
			password: "123456",
			role: RoleEnum.SIMPLE,
		}

		const createUserResponse = await controller.CreateUser(user);

		expect(createUserResponse.user).toEqual(expect.objectContaining(user));
		expect(createUserResponse.token).toBeTruthy();

		await controller.deleteUser(createUserResponse.user.id);
		// Verifica se o usuário foi removido do banco de dados.
		const deletedUser = await prismaService.user.findUnique({
			where: { id: createUserResponse.user.id },
		});

		expect(deletedUser).toBeNull();
	});
})
