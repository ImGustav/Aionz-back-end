import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData: Prisma.CategoryCreateInput[] = [
  { name: 'Eletrônicos' },
  { name: 'Livros' },
  { name: 'Roupas' },
  { name: 'Casa e Cozinha' },
]

const productData: Prisma.ProductCreateInput[] = [
  {
    name: 'Notebook Ultra 15.6"',
    description:
      'Notebook de alta performance com 16GB RAM, 512GB SSD e processador i7.',
    price: 4899.9,
    image: '/assets/products/notebook.jpg',
    category: { connect: { name: 'Eletrônicos' } },
  },
  {
    name: 'Fone de Ouvido Bluetooth (Branco)',
    description:
      'Fone de ouvido sem fio com cancelamento de ruído e 20h de bateria.',
    price: 349.9,
    image: '/assets/products/fone-bluetooth.jpg',
    category: { connect: { name: 'Eletrônicos' } },
  },
  {
    name: 'Smart TV 50" 4K',
    description:
      'Smart TV com resolução 4K, HDR, e sistema operacional integrado.',
    price: 2199.0,
    image: '/assets/products/smart-tv.jpg',
    category: { connect: { name: 'Eletrônicos' } },
  },
  {
    name: 'O Hobbit',
    description:
      'A clássica aventura de J.R.R. Tolkien que precede O Senhor dos Anéis.',
    price: 49.9,
    image: '/assets/products/livro-hobbit.jpg',
    category: { connect: { name: 'Livros' } },
  },
  {
    name: 'Camiseta Básica Algodão (Preta)',
    description:
      'Camiseta 100% algodão com corte clássico, ideal para o dia a dia.',
    price: 59.9,
    image: '/assets/products/camiseta-preta.jpg',
    category: { connect: { name: 'Roupas' } },
  },
  {
    name: 'Calça Jeans Slim Fit',
    description: 'Calça jeans masculina com lavagem escura e corte slim.',
    price: 189.9,
    image: '/assets/products/calca-jeans.jpg',
    category: { connect: { name: 'Roupas' } },
  },
  {
    name: 'Cafeteira Elétrica Programável',
    description:
      'Cafeteira que prepara até 30 xícaras de café, com filtro permanente.',
    price: 149.9,
    image: '/assets/products/cafeteira.jpg',
    category: { connect: { name: 'Casa e Cozinha' } },
  },
  {
    name: 'Jogo de Panelas Antiaderente (5 peças)',
    description: 'Conjunto de panelas com revestimento cerâmico, cor grafite.',
    price: 299.9,
    image: '/assets/products/jogo-panelas.jpg',
    category: { connect: { name: 'Casa e Cozinha' } },
  },
]

async function main() {
  console.log(`Iniciando o seed...`)

  console.log('Limpando dados antigos...')
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  console.log('Dados antigos limpos.')

  console.log('Criando categorias...')
  for (const catData of categoryData) {
    const category = await prisma.category.create({
      data: catData,
    })
    console.log(`Categoria criada: ${category.name}`)
  }
  console.log('Categorias criadas.')

  console.log('Criando produtos...')
  for (const prodData of productData) {
    const product = await prisma.product.create({
      data: prodData,
    })
    console.log(`Produto criado: ${product.name}`)
  }
  console.log('Produtos criados.')

  console.log(`Seed finalizado.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
