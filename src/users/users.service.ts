import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get a user by a unique value
   * @param userWhereUniqueInput
   * @returns {Promise<User|null>} user instance
   */
  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /**
   * Get a list of users with pagination, conditions and ordering
   * @param params
   * @returns {Promise<User[]>} list of users
   */
  async getUsers(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /**
   * Create a user
   * @param data
   * @returns {Promise<User|null>} user instance
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return this.prisma.user.create({
        data,
      });
    }
    return null;
  }

  /**
   * Update a user
   * @param params
   * @returns {Promise<User>} user instance
   */
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
    });
  }

  /**
   * Delete a user
   * @param where
   * @returns {Promise<User>} user instance
   */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
