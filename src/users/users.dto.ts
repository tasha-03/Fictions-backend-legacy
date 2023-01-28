import { Prisma } from '@prisma/client';

export class GetUserProfileDto {
  id: number;
  email: string;
  username: string;
}

export class ListParamsQuery {
  skip?: number;
  take?: number;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
