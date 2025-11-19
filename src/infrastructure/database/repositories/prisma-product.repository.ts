import { ProductRepository } from '@/domain/repositories/product.repository';
import { Product, CreateProductDTO, UpdateProductDTO } from '@/domain/entities/product.entity';
import { prisma } from '../prisma.client';

export class PrismaProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProductDTO): Promise<Product> {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        category: data.category,
        stock: data.stock,
      },
    });
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]): Promise<number> {
    const result = await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result.count;
  }
}
