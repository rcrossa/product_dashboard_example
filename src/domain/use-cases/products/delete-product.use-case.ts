import { ProductRepository } from '@/domain/repositories/product.repository';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    // Check if product exists
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(id);
  }
}
