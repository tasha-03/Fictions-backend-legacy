import { Prisma } from '@prisma/client';

export class TagsListParamsQuery {
  skip?: number;
  take?: number;
  where?: Prisma.TagWhereInput;
  orderBy?: Prisma.TagOrderByWithRelationInput;
}
