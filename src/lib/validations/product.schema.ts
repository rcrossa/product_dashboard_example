import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(255, 'El nombre es muy largo'),
  description: z.string().max(1000, 'La descripción es muy larga').optional(),
  category: z.string().min(1, 'La categoría es requerida').max(100, 'La categoría es muy larga'),
  stock: z.number().int('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo'),
});

export const updateProductSchema = productSchema.partial();

export type ProductFormData = z.infer<typeof productSchema>;
