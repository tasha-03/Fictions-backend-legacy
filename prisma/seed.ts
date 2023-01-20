import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.mail' },
    update: {},
    create: {
      email: 'admin@example.mail',
      password: 'admin123',
      username: 'Admin',
      birthdate: '31-03-2003',
      role: 'ADMIN',
    },
  });
  const user = await prisma.user.upsert({
    where: { email: 'user@example.mail' },
    update: {},
    create: {
      email: 'user@example.mail',
      password: 'user123',
      username: 'User',
      birthdate: '31-03-2003',
    },
  });
  console.log({ admin, user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
