import { UserRepository } from '@/domain/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { prisma } from '../prisma.client';

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async create(email: string, hashedPassword: string, name?: string): Promise<User> {
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name ?? null,
      },
    });
  }
}
