import { Prisma, Language, Rating, Category } from '@prisma/client';

export class WorksListParamsQuery {
  skip?: number;
  take?: number;
  where?: Prisma.WorkWhereInput;
  orderBy?: Prisma.WorkOrderByWithRelationInput;
}

export class WorkInfoDto {
  id: number;
  title: string;
  lang: string;
  rating: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    username: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  fandoms: {
    id: number;
    name: string;
  }[];
}

export class WorkCreateDto {
  title: string;
  lang?: Language;
  fandoms?: {
    id: number;
    name: string;
  }[];
  tags?: {
    id: number;
    name: string;
  }[];
  rating?: Rating | null;
  category?: Category | null;
  description: string;
  published?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  text: string;
}
