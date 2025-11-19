import { NextRequest, NextResponse } from 'next/server';
import { ZodError, z } from 'zod';
import { PrismaProductRepository } from '@/infrastructure/database/repositories/prisma-product.repository';
import { DeleteProductsUseCase } from '@/domain/use-cases/products/delete-products.use-case';


const productRepository = new PrismaProductRepository();

const deleteGroupSchema = z.object({
  ids: z.array(z.string()).min(1, 'Debes proporcionar al menos un ID'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = deleteGroupSchema.parse(body);

    const deleteProductsUseCase = new DeleteProductsUseCase(productRepository);
    const deletedCount = await deleteProductsUseCase.execute(validatedData.ids);

    return NextResponse.json(
      { success: true, deleted: deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting products:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos inválidos', details: (error as ZodError).issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al eliminar productos' },
      { status: 500 }
    );
  }
}
