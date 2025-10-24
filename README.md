# Projeto AIONZ - Back-end API

Este repositório contém o código-fonte de uma API RESTful completa, desenvolvida como parte da Avaliação Prática para Vaga Júnior Full Stack.

A API foi construída com NestJS, Prisma ORM e PostgreSQL, e oferece um sistema de CRUD para gerenciar produtos e categorias, incluindo uma funcionalidade robusta de upload de imagens.

## Modelo de Entidade e Relacionamento (MER)

O esquema do banco de dados para este projeto é composto pelas seguintes entidades e seus relacionamentos:

<img src="./assets/MER.jpg" alt="Modelo de Entidade e Relacionamento do Banco de Dados" width="600"/>

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
    * `image`: Caminho da imagem do produto no servidor (ex: `/static/uploads/abc123def456.jpg`).

## Tecnologias Utilizadas

* **NestJS**: Framework Node.js progressivo para construção de aplicativos de lado do servidor.
* **TypeScript**: Superconjunto tipado de JavaScript para maior segurança e manutenibilidade.
* **Prisma ORM**: ORM moderno para Node.js e TypeScript.
* **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
* **Multer**: Middleware Node.js para lidar com `multipart/form-data` (uploads).
* **class-validator / class-transformer**: Bibliotecas para validação e transformação de DTOs.
* **Docker**: Plataforma de containerização para desenvolvimento e produção.
* **Dotenv**: Para gerenciamento de variáveis de ambiente.

## Instalação e Execução (Local)

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

1.  **Clone o Repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd back-end
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Ambiente:**

    Crie uma cópia do arquivo `.env.example` na raiz do projeto e renomeie para `.env`. Em seguida, preencha as variáveis de ambiente:

    ```env
    # Exemplo de .env
    DATABASE_URL="postgresql://[USUARIO]:[SENHA]@localhost:5432/[NOME_DO_BANCO]?schema=public"

    # Variáveis para o Multer
    MULTER_DEST=./public/uploads
    MULTER_MAX_SIZE=5242880 # 5MB
    ```

4.  **Execute as Migrações do Prisma:**
    ```bash
    npx prisma migrate dev
    ```
    Isso aplicará as migrações do banco de dados e gerará o cliente Prisma.

5.  **Crie a Pasta de Uploads:**
    O `MulterModule` espera que esta pasta exista.
    ```bash
    mkdir -p public/uploads
    ```

6.  **Inicie o Servidor:**
    ```bash
    npm run start:dev --watch
    ```
    O servidor estará rodando em `http://localhost:3000`.

## Executando com Docker

Este projeto está configurado para ser executado inteiramente com Docker, facilitando a inicialização.

1.  **Construa a Imagem Docker:**
    A partir da raiz do projeto, execute:
    ```bash
    docker build -t aionz-api .
    ```

2.  **Execute o Container:**
    Certifique-se de que seu banco de dados PostgreSQL esteja acessível.
    ```bash
    docker run -p 3000:3000 \
      -e DATABASE_URL="[STRING_DE_CONEXAO_DO_SEU_BANCO]" \
      --name aionz-container \
      aionz-api
    ```
    *Nota: Se o seu banco de dados também estiver rodando em um container Docker, use o nome do container do banco na string de conexão (ex: `postgresql://user:pass@postgres-db:5432/aionz`). Se estiver rodando no seu *host* (localhost), você pode precisar usar `host.docker.internal` em vez de `localhost`.*

## Endpoints da API

A API expõe os seguintes endpoints:

### Categorias (`/category`)

* **`POST /category`**
    * Cria uma nova categoria.
    * **Body:** `CreateCategoryDto` (JSON)
* **`GET /category`**
    * Retorna todas as categorias.
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
    * **Body:**
        * `image`: (File) O arquivo de imagem.
        * `category_id`: (Text) ID da categoria.
        * `name`: (Text) Nome do produto.
        * `description`: (Text) Descrição do produto.
        * `price`: (Text) Preço do produto.
* **`GET /produtos`**
    * Retorna todos os produtos.
* **`GET /produtos/:id`**
    * Retorna um produto específico pelo ID.
* **`PATCH /produtos/:id`**
    * Atualiza um produto existente.
    * **Body:** `UpdateProdutoDto` (JSON)
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