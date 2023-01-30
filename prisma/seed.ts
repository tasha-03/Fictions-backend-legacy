import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import {
  FANDOMS_GENERATE,
  TAGS_GENERATE,
  FANDOM_GENERATE_CONNECTED,
  DEFAULT_WORK_TITLE,
  DEFAULT_WORK_DESCRIPTION,
  DEFAULT_WORK_TEXT,
} from './templates';

const DEFAULT_WORK_CREATION = {
  title: DEFAULT_WORK_TITLE,
  description: DEFAULT_WORK_DESCRIPTION,
  tags: {
    create: TAGS_GENERATE,
  },
  fandoms: {
    connectOrCreate: {
      where: { name: FANDOM_GENERATE_CONNECTED.name },
      create: FANDOM_GENERATE_CONNECTED,
    },
  },
  text: DEFAULT_WORK_TEXT,
};

const prisma = new PrismaClient();
async function main() {
  const tags_deleted = await prisma.tag.deleteMany();
  const fandoms_deleted = await prisma.fandom.deleteMany();
  const works_deleted = await prisma.work.deleteMany();
  const users_deleted = await prisma.user.deleteMany();
  console.log({
    tags_deleted,
    fandoms_deleted,
    works_deleted,
    users_deleted,
  });

  const fandoms = await Promise.all(
    FANDOMS_GENERATE.map((fandom) =>
      prisma.fandom.upsert({
        where: {
          name: fandom.name,
        },
        update: {},
        create: fandom,
      }),
    ),
  );

  console.log(`Fandoms generated:`, { fandoms });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.mail' },
    update: {},
    create: {
      email: 'admin@example.mail',
      password: await hash('admin123', 10),
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
      password: await hash('user123', 10),
      username: 'User',
      birthdate: '31-03-2003',
    },
  });
  console.log(`Users created:`, { admin, user });

  const work = await prisma.work.create({
    data: {
      title: DEFAULT_WORK_TITLE,
      description: DEFAULT_WORK_DESCRIPTION,
      tags: {
        create: TAGS_GENERATE,
      },
      fandoms: {
        connectOrCreate: {
          where: { name: FANDOM_GENERATE_CONNECTED.name },
          create: FANDOM_GENERATE_CONNECTED,
        },
      },
      text: DEFAULT_WORK_TEXT,
      author: {
        connect: { id: user.id },
      },
      published: true,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      lang: true,
      rating: true,
      category: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      tags: true,
      fandoms: true,
    },
  });

  console.log(`Work created:`, { work });
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
