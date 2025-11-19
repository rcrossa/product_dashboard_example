import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { PrismaProductRepository } from '@/infrastructure/database/repositories/prisma-product.repository';
import { GetProductsUseCase } from '@/domain/use-cases/products/get-products.use-case';
import { CreateProductUseCase } from '@/domain/use-cases/products/create-product.use-case';
import { productSchema } from '@/lib/validations/product.schema';

const productRepository = new PrismaProductRepository();

export async function GET() {
  try {
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const products = await getProductsUseCase.execute();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = productSchema.parse(body);

    const createProductUseCase = new CreateProductUseCase(productRepository);
    const product = await createProductUseCase.execute(validatedData);

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos de producto inválidos', details: (error as ZodError).issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al crear producto' },
      { status: 500 }
    );
  }
}
