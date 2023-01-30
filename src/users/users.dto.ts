import { Prisma } from '@prisma/client';

export class GetUserProfileDto {
  id: number;
  email: string;
  username: string;
}

export class UsersListParamsQuery {
  skip?: number;
  take?: number;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
