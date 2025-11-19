import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, CreateProductDTO, UpdateProductDTO } from '@/domain/entities/product.entity';

const API_URL = '/api/products';

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al cargar productos');
  }
  const data = await response.json();
  return data.products;
}

async function createProduct(product: CreateProductDTO): Promise<Product> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? 'Error al crear producto');
  }
  const data = await response.json();
  return data.product;
}

async function updateProduct(id: string, product: UpdateProductDTO): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? 'Error al actualizar producto');
  }
  const data = await response.json();
  return data.product;
}

async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? 'Error al eliminar producto');
  }
}

async function deleteProducts(ids: string[]): Promise<number> {
  const response = await fetch(`${API_URL}/delete-group`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? 'Error al eliminar productos');
  }
  const data = await response.json();
  return data.deleted;
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
