export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  category: string;
  stock: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  category?: string;
  stock?: number;
}
