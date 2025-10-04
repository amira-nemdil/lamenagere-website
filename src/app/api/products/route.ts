import { NextRequest, NextResponse } from 'next/server';
import database from '@/lib/database-simple';

export async function GET() {
  try {
    const products = await database.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    const productId = await database.createProduct({
      name: productData.name,
      nameAr: productData.nameAr || productData.name,
      nameEn: productData.nameEn || productData.name,
      description: productData.description,
      descriptionAr: productData.descriptionAr || productData.description,
      descriptionEn: productData.descriptionEn || productData.description,
      price: parseFloat(productData.price),
      category: productData.category,
      brand: productData.brand || '',
      origin: productData.origin || '',
      size: productData.size || '',
      images: productData.images || [],
      stockLevel: parseInt(productData.stockLevel) || 0,
      active: true
    });

    return NextResponse.json(
      { success: true, id: productId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}