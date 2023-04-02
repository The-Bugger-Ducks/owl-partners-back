<h1 align="center"> Serviço Backend Owl Partners</h1>

Esta API, que permite gerenciamento de parcerias, foi desenvolvida visando sua utilização no projeto "OwlPartners" (mais informações vide [este link](https://github.com/The-Bugger-Ducks/owl-partners-documentation)).

> Aplicação desenvolvida por alunos do 5º semestre do tecnólogo em Desenvolvimento de Software Multiplataforma, na FATEC Profº Jessen Vidal - São José dos Campos, SP :rocket:

### :hammer_and_wrench: Tecnologias

As seguintes tecnologias e ferramentas foram utilizadas neste projeto: `Typescript, NestJS, PostgreSQL, Docker, Insomnia`

### :gear: Como utilizar

Para consumir esta API, é preciso seguir o passo a passo abaixo ou utilizar a URL do serviço em nuvem (através deste link: [owlPartnersAPI](https://owlpartners.onrender.com)).

- Tutorial para rodar o projeto

```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/The-Bugger-Ducks/owl-partners-back.git

# Acesse a pasta do projeto
$ cd owl-partners-back

# criar um arquivo chamado ".env" e copiar a estrutura do arquivo ".env.example" e colocar seus respectivos dados

# instale as dependencias
$ yarn install
      ou
$ npm install

# Utilize o docker-compose para criar o banco de dados
$ docker-compose up -d

# Utilize o comando do Prisma para sincronizar a estrutura do banco de dados
$ npx prisma migrate deploy

# Inicie o Projeto
$ yarn start
      ou
$ npm run start
```

O servidor inciará localmente na porta 3000 (citada no arquivo .env). Use o Insomnia ou postman para simular requisições e respostas das rotas (pelo link [https://localhost:3000](https://localhost:3000)) ou utilize o projeto de aplicativo mobile do "OwlPartners" para executar as funcionalidades da aplicação (acesse o repositório por [este link](https://github.com/The-Bugger-Ducks/owl-partners-mobile)) ou o projeto front-end WEB [neste link](https://github.com/The-Bugger-Ducks/owl-partners-web).

Caso queira usar o Insomnia para testar as rotas, use o arquivo Insomnia_2023_mm_dd.json para importar as requisições.

## :railway_track: Rotas disponíveis
Para acessar as rotas disponiveis acesse o link para o [https://owlpartners.onrender.com/api](Swagger) na nuvem ou para o [http://localhost:3000](SwagerLocalhost)

<div align="center">

|                                                                    Tipo | Rota                               | Ação                                |
| :---------------------------------------------------------------------- | :--------------------------------- | :---------------------------------- |
|   <hr>                                                                  | <hr>                               | **Controle de usuários**            |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/users/`                          | Cadastro de usuários                |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/users/`                          | Listagem de usuários                |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/users/{userId}`                  | Exclusão de um usuário específico   |
|   <hr>                                                                  | <hr>                               | **Controle de parcerias**           |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/partners/`                       | Criação de parceria                 |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/partners/`                       | Listagem de parcerias               |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/partners/search/:name`           | Listagem de especificas por nome    |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | `/partners/{partnerId}`        | Visualização de uma parceria específica |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/partners/{partnerId}`            | Editar dados da parceria específica |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/partners/{partnerId}`         | Desativação de uma parceria específica |
|   <hr>                                                                  | <hr>                         | **Controle de anotações sobre parcerias** |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/partners/comment`                | Cadastrar anotação sobre a parceria |
|   [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]()  | `/partners/comment/:commentId`   | Visualizar anotações sobre a parceria |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | `/partners/comment/:commentId`     | Atualizar anotação sobre a parceria |
|   <hr>                                                                  | <hr>                         			 | **Autenticação de usuários**        |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/auth/login`               	 | Autenticaçãr usuários com email e senha |

</div>

### Explicação da estrutura das pastas

| Pasta                                             | Definição                                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| :open_file_folder: prisma/migrations              | Arquivos com função em versionar a estrutura do banco de dados                             |
| :page_facing_up: prisma/schema.prisma             | Arquivo para config de estrutura e de relacionamento das entidades do banco de dados       |
| :open_file_folder: src/                           | Arquivos com o código fonte do projeto                                                     |
| :open_file_folder: src/modules                    | Arquivos com os módulos do serviço que se divide em varias partes do projeto               |
| :open_file_folder: src/modules/auth               | Arquivos com foco em autenticação e autorização para acesso aos endpoints                  |
| :open_file_folder: src/modules/partner            | Arquivos com foco metodos, controlers, enums e DTOs sobre parcerias                        |
| :open_file_folder: src/modules/partnerComment     | Arquivos com foco metodos, controlers, enums e DTOs de anotações sobre as parcerias        |
| :open_file_folder: src/modules/partnerComment     | Arquivos com foco metodos, controlers, enums e DTOs sobre os usuários                      |
| :open_file_folder: src/ * * / * * /enums          | Arquivos de padronização de entrada para campos específicos no banco de dados              |
| :open_file_folder: src/ * * / * * /dto            | Arquivos de padronização e validação de campos exigidos no corpo das requisições           |
| :open_file_folder: src/ * * / * * /validation     | Arquivos para criação de validações customizadas que o class-validator nao abrange         |
| :page_facing_up: src/main.ts                      | Arquivo principal de inicialização do projeto                                              |
| :page_facing_up: src/app.module.ts                | Arquivo para gerenciar modulos pela raíz do projeto                                        |
| :open_file_folder: test/                          | Arquivos com foco tem testes unitários do serviço owlPartners                              |
| :page_facing_up: .editorConfig             | Arquivo usado para padronizar a codificação do projeto como espaços em identações, pontuações etc |
| :page_facing_up: .env               | Arquivo usado para variáveis de ambiente como chaves de autenticação e URL do banco de dados de produção |
| :page_facing_up: .env.sample                      | Arquivo usado como molde para o verdadeiro .env                                            |
| :page_facing_up: docker-compose.yml               | Arquivo usado para "conteinerizar" um banco postgres local                                 |
| :page_facing_up: Dockerfile                       | Arquivo usado para integração contínua de deploy em um servidor                            |
| :page_facing_up: jest.config.json                 | Arquivo usado para configurar a biblioteca JEST para execução dos testes                   |
| :page_facing_up: insomnia_2023_mm_dd.json         | Arquivo usado para importar requisições para as rotas do projeto no Insomnia               |
| :page_facing_up: tsconfig.json                    | Arquivo usado para configurar o typescript como sintaxe, organização de arquivos, etc.     |
| :page_facing_up: package.json                     | Arquivo usado gerenciar as dependencias do projeto com o Yarn e compor scripts de terminal |
