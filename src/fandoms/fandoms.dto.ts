import { Prisma } from '@prisma/client';

export class FandomsListParamsQuery {
  skip?: number;
  take?: number;
  where?: Prisma.FandomWhereInput;
  orderBy?: Prisma.FandomOrderByWithRelationInput;
}
