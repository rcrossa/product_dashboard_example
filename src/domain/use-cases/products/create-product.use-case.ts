import { ProductRepository } from '@/domain/repositories/product.repository';
import { Product, CreateProductDTO } from '@/domain/entities/product.entity';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    // Business logic validation
    if (data.stock < 0) {
      throw new Error('Stock cannot be negative');
    }

    if (!data.name.trim()) {
      throw new Error('Product name is required');
    }

    if (!data.category.trim()) {
      throw new Error('Category is required');
    }

    return await this.productRepository.create(data);
  }
}
