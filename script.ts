import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
//   const usersWithPosts = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   })


// create
// const user = await prisma.user.create({
//   data: {
//     email: 'elsa@prisma.io',
//     name: 'Elsa Prisma',
//   },
// })

// create many
// const createMany = await prisma.user.createMany({
//   data: [
//     { name: 'Yewande', email: 'yewande@prisma.io' },
//     { name: 'Angelique', email: 'angelique@prisma.io' },
//   ],
// })

// By unique identifier
const user = await prisma.user.findUnique({
  where: {
    email: 'elsa@prisma.io',
  },
})

// Filter by related record field values
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
    posts: {
      some: {
        published: false,
      },
    },
  },
})

// Update a single record
const updateUser = await prisma.user.update({
  where: {
    email: 'alice@prisma.io',
  },
  data: {
    name: 'Alice Alice',
  },
})

// Update multiple records
const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  data: {
    name: 'ADMIN',
  },
})

// Delete a single record
const deleteUser = await prisma.user.delete({
  where: {
    email: 'angelique@prisma.io',
  },
})

console.log(users)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })