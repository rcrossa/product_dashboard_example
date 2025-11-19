import { ProductRepository } from '@/domain/repositories/product.repository';

export class DeleteProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(ids: string[]): Promise<number> {
    if (!ids || ids.length === 0) {
      throw new Error('No product IDs provided');
    }

    return await this.productRepository.deleteMany(ids);
  }
}
