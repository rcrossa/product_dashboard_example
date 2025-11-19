import { Product, CreateProductDTO, UpdateProductDTO } from '../entities/product.entity';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProductDTO): Promise<Product>;
  update(id: string, data: UpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<number>;
}
