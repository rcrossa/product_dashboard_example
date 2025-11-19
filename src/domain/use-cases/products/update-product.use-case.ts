import { ProductRepository } from '@/domain/repositories/product.repository';
import { Product, UpdateProductDTO } from '@/domain/entities/product.entity';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDTO): Promise<Product> {
    // Check if product exists
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    // Business logic validation
    if (data.stock !== undefined && data.stock < 0) {
      throw new Error('Stock cannot be negative');
    }

    if (data.name !== undefined && !data.name.trim()) {
      throw new Error('Product name cannot be empty');
    }

    if (data.category !== undefined && !data.category.trim()) {
      throw new Error('Category cannot be empty');
    }

    return await this.productRepository.update(id, data);
  }
}
