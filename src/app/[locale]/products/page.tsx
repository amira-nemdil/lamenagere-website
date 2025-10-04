'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Product } from '@/lib/database-simple';
import { formatPrice, getStockStatus } from '@/lib/utils';

export default function ProductsPage() {
  const t = useTranslations();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
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

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('lamenagere-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCartToStorage = (newCart: {[key: number]: number}) => {
    localStorage.setItem('lamenagere-cart', JSON.stringify(newCart));
  };

  const addToCart = (productId: number) => {
    const newCart = {
      ...cart,
      [productId]: (cart[productId] || 0) + 1
    };
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: t('products.categories.all') },
    { value: 'detergents', label: t('products.categories.detergents') },
    { value: 'cleaning-supplies', label: t('products.categories.cleaningSupplies') },
    { value: 'household-items', label: t('products.categories.household') },
  ];

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'available': return t('products.available');
      case 'low': return t('products.lowStock');
      case 'out': return t('products.outOfStock');
      default: return t('products.available');
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'out': return 'text-red-600 bg-red-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">{t('company.name')}</h1>
                <p className="text-sm text-gray-600">{t('products.title')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="text-sm text-gray-600">
                  {t('cart.title')}: {Object.values(cart).reduce((a, b) => a + b, 0)}
                </span>
              </div>
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
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('products.categories.all')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stockLevel);
              const stockText = getStockStatusText(stockStatus);
              const stockColor = getStockStatusColor(stockStatus);
              
              return (
                <Card key={product.id} className="product-card-hover">
                  <CardHeader className="p-4">
                    <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={product.images?.[0] || `https://placehold.co/400x400?text=${encodeURIComponent(product.name + ' ' + product.category + ' product image')}`}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/400x400?text=${encodeURIComponent(product.name + ' ' + product.category + ' product image')}`;
                        }}
                      />
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockColor}`}>
                          {stockText}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        {product.brand && (
                          <div><span className="font-medium">{t('products.brand')}:</span> {product.brand}</div>
                        )}
                        {product.origin && (
                          <div><span className="font-medium">{t('products.origin')}:</span> {product.origin}</div>
                        )}
                        {product.size && (
                          <div><span className="font-medium">{t('products.size')}:</span> {product.size}</div>
                        )}
                        <div><span className="font-medium">{t('products.stock')}:</span> {product.stockLevel}</div>
                      </div>
                      
                      <Button
                        onClick={() => addToCart(product.id)}
                        disabled={stockStatus === 'out'}
                        className="w-full"
                      >
                        {stockStatus === 'out' ? t('products.outOfStock') : t('products.addToCart')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}