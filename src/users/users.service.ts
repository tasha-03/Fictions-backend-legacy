import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { User, Prisma } from '@prisma/client';
import { GetUserProfileDto } from './users.dto';

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
   * Get a GetUserProfileDto by a unique value
   * @param userWhereUniqueInput
   * @returns {Promise<GetUserProfileDto | null>} GetUserProfileDto
   */
  async getUserProfile(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<GetUserProfileDto | null> {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        username: true,
      },
      where: userWhereUniqueInput,
    });
  }

  /**
   * Get a list of users with pagination, conditions and ordering
   * @param params
   * @returns {Promise<GetUserProfileDto[]>} list of users
   */
  async getUsers(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<GetUserProfileDto[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  /**
   * Create a GetUserProfileDto
   * @param data
   * @returns {Promise<GetUserProfileDto|null>} GetUserProfileDto instance
   */
  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<GetUserProfileDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return this.prisma.user.create({
        select: {
          id: true,
          email: true,
          username: true,
        },
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
