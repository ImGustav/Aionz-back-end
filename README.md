# Projeto AIONZ - Back-end API

Este repositório contém o código-fonte de uma API RESTful completa, desenvolvida como parte da Avaliação Prática para Vaga Júnior Full Stack.

A API foi construída com NestJS, Prisma ORM e PostgreSQL, e oferece um sistema de CRUD para gerenciar produtos e categorias, incluindo uma funcionalidade robusta de upload de imagens.

## Modelo de Entidade e Relacionamento (MER)

O esquema do banco de dados para este projeto é composto pelas seguintes entidades e seus relacionamentos:

<img src="./public/MER.jpg" alt="Modelo de Entidade e Relacionamento do Banco de Dados" width="600"/>

**Descrição das Entidades:**

* **`Category`**: Representa as categorias de produtos.
    * `id`: Chave primária.
    * `name`: Nome único da categoria.
* **`Product`**: Representa os produtos disponíveis.
    * `id`: Chave primária.
    * `category_id`: Chave estrangeira que referencia a categoria à qual o produto pertence.
    * `name`: Nome do produto.
    * `description`: Descrição detalhada do produto.
    * `price`: Preço do produto.
    * `image`: Caminho da imagem do produto no servidor (ex: `/static/uploads/nome_unico.jpg`).

## Tecnologias Utilizadas

* **NestJS**: Framework Node.js progressivo para construção de aplicativos de lado do servidor.
* **TypeScript**: Superconjunto tipado de JavaScript para maior segurança e manutenibilidade.
* **Prisma ORM**: ORM moderno para Node.js e TypeScript.
* **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
* **Multer**: Middleware Node.js para lidar com `multipart/form-data` (uploads).
* **class-validator / class-transformer**: Bibliotecas para validação e transformação de DTOs.
* **Docker**: Plataforma de containerização para desenvolvimento e produção.
* **Dotenv**: Para gerenciamento de variáveis de ambiente.

## Executando com Docker

Para a utilização do PostgreSQL, foi criado um serviço no arquivo `docker-compose.yml`. Para subir o container do banco de dados:

1.  **Execute o Docker Compose:**
    Certifique-se de que esteja na pasta raiz do projeto.
    ```bash
    docker compose up -d
    ```
    *(Isso iniciará o container do PostgreSQL em segundo plano).*

## Instalação e Execução (Local)

Siga os passos abaixo para configurar e rodar o projeto API em sua máquina local:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/ImGustav/Aionz-back-end.git
    cd back-end
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Ambiente:**

    Crie uma cópia do arquivo `.env.example` na raiz do projeto e renomeie para `.env`. Em seguida, preencha as variáveis de ambiente com suas configurações:

    ```env
    # Exemplo de .env
    DATABASE_URL="postgresql://[USUARIO]:[SENHA]@localhost:5432/[NOME_DO_BANCO]?schema=public"

    # Variáveis para o Multer
    MULTER_DEST=./public/uploads
    MULTER_MAX_SIZE=5242880 # 5MB
    ```

4.  **Crie a Pasta de Uploads:**
    A API precisa desta pasta para salvar as imagens enviadas.
    ```bash
    mkdir -p public/uploads
    ```

5.  **Aplique as Migrações do Banco:**
    A partir da raiz do projeto (`back-end`), execute o comando de migração, especificando o local do schema:
    ```bash
    npx prisma migrate dev --schema=./src/database/prisma/schema.prisma

    #ou caso esteja na pasta src/database/prisma use:

    npx prisma migrate dev
    ```
    *(Isso aplicará as migrações e gerará o cliente Prisma).*

6.  **Popule o Banco (Seed - Opcional):**
    A partir da so prisma (`src/databse/prisma`), execute o comando de seed:
    ```bash
    npx prisma db seed
    ```
    *(Isso irá criar algumas categorias e produtos pré-selecionados. As imagens desses produtos estarão dentro da pasta `public`).*

7.  **Inicie o Servidor:**
    A partir da raiz do projeto (`back-end`), inicie a aplicação:
    ```bash
    npm run start:dev --watch
    ```
    O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

A API expõe os seguintes endpoints:

### Categorias (`/category`)

* **`POST /category`**
    * Cria uma nova categoria.
    * **Body:** `CreateCategoryDto` (JSON)
* **`GET /category`**
    * Retorna todas as categorias (formato `Category[]`).
* **`GET /category/:id`**
    * Retorna uma categoria específica pelo ID.
* **`PATCH /category/:id`**
    * Atualiza uma categoria existente.
    * **Body:** `UpdateCategoryDto` (JSON)
* **`DELETE /category/:id`**
    * Deleta uma categoria.

### Produtos (`/produtos`)

* **`POST /produtos`**
    * Cria um novo produto com upload de imagem.
    * **Content-Type:** `multipart/form-data`
    * **Body:** `image` (File), `category_id` (Text), `name` (Text), `description` (Text), `price` (Text).
* **`GET /produtos`**
    * Retorna uma lista paginada de produtos. Aceita query params: `page` (number, default 1), `limit` (number, default 10), `search` (string, opcional).
    * **Retorno:** `{ data: Product[], total: number }`
* **`GET /produtos/:id`**
    * Retorna um produto específico pelo ID, incluindo sua categoria.
* **`PATCH /produtos/:id`**
    * Atualiza um produto existente. Pode receber uma nova imagem opcionalmente.
    * **Content-Type:** `multipart/form-data`
    * **Body:** `image` (File, opcional), `category_id` (Text, opcional), `name` (Text, opcional), `description` (Text, opcional), `price` (Text, opcional).
* **`DELETE /produtos/:id`**
    * Deleta um produto.

## Swagger (Documentação da API)

A documentação completa da API, com todos os endpoints, DTOs e respostas, é gerada automaticamente pelo Swagger (OpenAPI).

Após iniciar o servidor, você pode acessá-la em:

**[http://localhost:3000/api](http://localhost:3000/api)**

## Autor

**Gustavo Henrique Carvalho**

* **Email:** [oakhenry2@gmail.com](mailto:oakhenry2@gmail.com)
* **LinkedIn:** [gustavo-oak](https://www.linkedin.com/in/gustavo-oak/)