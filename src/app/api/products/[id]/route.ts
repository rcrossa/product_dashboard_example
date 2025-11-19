import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { PrismaProductRepository } from '@/infrastructure/database/repositories/prisma-product.repository';
import { UpdateProductUseCase } from '@/domain/use-cases/products/update-product.use-case';
import { DeleteProductUseCase } from '@/domain/use-cases/products/delete-product.use-case';
import { updateProductSchema } from '@/lib/validations/product.schema';

const productRepository = new PrismaProductRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await productRepository.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = updateProductSchema.parse(body);

    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const product = await updateProductUseCase.execute(params.id, validatedData);

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos de producto inválidos', details: (error as ZodError).issues },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Product not found') {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al actualizar producto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleteProductUseCase = new DeleteProductUseCase(productRepository);
    await deleteProductUseCase.execute(params.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);

    if (error instanceof Error && error.message === 'Product not found') {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
