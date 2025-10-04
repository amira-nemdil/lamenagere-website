'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Product } from '@/lib/database-simple';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const t = useTranslations();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    nameAr: '',
    nameEn: '',
    description: '',
    descriptionAr: '',
    descriptionEn: '',
    price: '',
    category: 'detergents',
    brand: '',
    origin: '',
    size: '',
    stockLevel: '',
    images: [] as string[]
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setShowAddProduct(false);
        setNewProduct({
          name: '',
          nameAr: '',
          nameEn: '',
          description: '',
          descriptionAr: '',
          descriptionEn: '',
          price: '',
          category: 'detergents',
          brand: '',
          origin: '',
          size: '',
          stockLevel: '',
          images: []
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real application, you would upload these files to a cloud service
      // For demo purposes, we'll use placeholder URLs
      const imageUrls = Array.from(files).map((file, index) => 
        `https://placehold.co/400x400?text=${encodeURIComponent(newProduct.name + ' image ' + (index + 1))}`
      );
      setNewProduct({ ...newProduct, images: imageUrls });
    }
  };

  const categories = [
    { value: 'detergents', label: t('products.categories.detergents') },
    { value: 'cleaning-supplies', label: t('products.categories.cleaningSupplies') },
    { value: 'household-items', label: t('products.categories.household') },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-shimmer w-12 h-12 rounded-full mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">LM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
                <p className="text-sm text-gray-600">{t('company.name')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button 
                variant="outline" 
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.href = '/';
                }}
              >
                {t('auth.signOut')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t('admin.products')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{products.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t('products.available')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {products.filter(p => p.stockLevel > 0).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t('products.lowStock')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {products.filter(p => p.stockLevel > 0 && p.stockLevel <= 5).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{t('admin.products')}</h2>
            <Button onClick={() => setShowAddProduct(true)}>
              {t('admin.addProduct')}
            </Button>
          </div>

          {/* Add Product Form */}
          {showAddProduct && (
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.addProduct')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('admin.productName')} (FR)</label>
                      <Input
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('admin.productName')} (AR)</label>
                      <Input
                        value={newProduct.nameAr}
                        onChange={(e) => setNewProduct({ ...newProduct, nameAr: e.target.value })}
                        placeholder="اسم المنتج"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('admin.productName')} (EN)</label>
                      <Input
                        value={newProduct.nameEn}
                        onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                        placeholder="Product name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('admin.productPrice')}</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('admin.productCategory')}</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('products.brand')}</label>
                      <Input
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('products.origin')}</label>
                      <Input
                        value={newProduct.origin}
                        onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">{t('admin.stockLevel')}</label>
                      <Input
                        type="number"
                        value={newProduct.stockLevel}
                        onChange={(e) => setNewProduct({ ...newProduct, stockLevel: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">{t('admin.productDescription')} (FR)</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">{t('admin.uploadImages')}</label>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">{t('admin.dragDropImages')}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">{t('admin.saveProduct')}</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddProduct(false)}
                    >
                      {t('common.cancel')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Products List */}
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{t('products.category')}: {product.category}</span>
                        <span>{t('products.price')}: {formatPrice(product.price)}</span>
                        <span>{t('products.stock')}: {product.stockLevel}</span>
                        {product.brand && <span>{t('products.brand')}: {product.brand}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        {t('common.edit')}
                      </Button>
                      <Button variant="destructive" size="sm">
                        {t('common.delete')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}