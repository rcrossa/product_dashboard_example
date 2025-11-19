import { ProductRepository } from '@/domain/repositories/product.repository';
import { Product } from '@/domain/entities/product.entity';

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
