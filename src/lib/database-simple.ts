// Simple in-memory database for demo purposes
// In production, you would use a proper database

export interface User {
  id: number;
  clientId: string;
  name: string;
  password: string;
  role: 'admin' | 'client';
  active: boolean;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  nameAr: string;
  nameEn: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  category: string;
  brand: string;
  origin: string;
  size: string;
  images: string[];
  stockLevel: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  orderId: string;
  clientId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  active: boolean;
}

class SimpleDatabase {
  private users: User[] = [];
  private products: Product[] = [];
  private orders: Order[] = [];
  private categories: Category[] = [];
  private nextId = {
    users: 1,
    products: 1,
    orders: 1,
    categories: 1
  };

  constructor() {
    this.initData();
  }

  private initData() {
    // Default admin user
    this.users.push({
      id: this.nextId.users++,
      clientId: 'ADMIN001',
      name: 'Administrator',
      password: '$2a$10$dR7pGFbUZZzuznINwrDniOJG3HBCJeUw/CRAojR0BycNLMPG2BN66', // password
      role: 'admin',
      active: true,
      createdAt: new Date().toISOString()
    });

    // Demo client user
    this.users.push({
      id: this.nextId.users++,
      clientId: 'CLIENT001',
      name: 'Client Démonstration',
      password: '$2a$10$dR7pGFbUZZzuznINwrDniOJG3HBCJeUw/CRAojR0BycNLMPG2BN66', // password
      role: 'client',
      active: true,
      createdAt: new Date().toISOString()
    });

    // Default categories
    this.categories.push(
      {
        id: this.nextId.categories++,
        name: 'Détergents',
        nameAr: 'المنظفات',
        nameEn: 'Detergents',
        slug: 'detergents',
        active: true
      },
      {
        id: this.nextId.categories++,
        name: 'Produits d\'entretien',
        nameAr: 'مستلزمات التنظيف',
        nameEn: 'Cleaning Supplies',
        slug: 'cleaning-supplies',
        active: true
      },
      {
        id: this.nextId.categories++,
        name: 'Articles ménagers',
        nameAr: 'أدوات منزلية',
        nameEn: 'Household Items',
        slug: 'household-items',
        active: true
      }
    );

    // Sample products
    this.products.push(
      {
        id: this.nextId.products++,
        name: 'Détergent Multi-Surface Professionnel',
        nameAr: 'منظف متعدد الأسطح المهني',
        nameEn: 'Professional Multi-Surface Cleaner',
        description: 'Détergent puissant pour tous types de surfaces. Formule concentrée importée.',
        descriptionAr: 'منظف قوي لجميع أنواع الأسطح. تركيبة مركزة مستوردة.',
        descriptionEn: 'Powerful cleaner for all surface types. Imported concentrated formula.',
        price: 25.50,
        category: 'detergents',
        brand: 'CleanMax Pro',
        origin: 'Allemagne',
        size: '5L',
        images: [
          'https://placehold.co/400x400?text=Professional+Multi+Surface+Cleaner+Bottle+5L+German+Import',
          'https://placehold.co/400x400?text=CleanMax+Pro+Detergent+Product+Label+Details'
        ],
        stockLevel: 45,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: this.nextId.products++,
        name: 'Désinfectant Antibactérien Premium',
        nameAr: 'مطهر مضاد للبكتيريا فاخر',
        nameEn: 'Premium Antibacterial Disinfectant',
        description: 'Désinfectant haute efficacité éliminant 99.9% des bactéries et virus.',
        descriptionAr: 'مطهر عالي الفعالية يقضي على 99.9% من البكتيريا والفيروسات.',
        descriptionEn: 'High-efficiency disinfectant eliminating 99.9% of bacteria and viruses.',
        price: 18.75,
        category: 'cleaning-supplies',
        brand: 'BioSafe',
        origin: 'France',
        size: '2L',
        images: [
          'https://placehold.co/400x400?text=BioSafe+Antibacterial+Disinfectant+2L+Bottle+French+Import',
          'https://placehold.co/400x400?text=Premium+Disinfectant+99.9+Percent+Effective+Label'
        ],
        stockLevel: 32,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: this.nextId.products++,
        name: 'Liquide Vaisselle Écologique Concentré',
        nameAr: 'سائل غسيل الأطباق البيئي المركز',
        nameEn: 'Concentrated Eco-Friendly Dish Soap',
        description: 'Formule écologique biodégradable, douce pour les mains et efficace sur la graisse.',
        descriptionAr: 'تركيبة بيئية قابلة للتحلل، لطيفة على اليدين وفعالة ضد الدهون.',
        descriptionEn: 'Biodegradable eco-friendly formula, gentle on hands and effective on grease.',
        price: 12.90,
        category: 'detergents',
        brand: 'EcoClean',
        origin: 'Pays-Bas',
        size: '1L',
        images: [
          'https://placehold.co/400x400?text=EcoClean+Concentrated+Dish+Soap+1L+Netherlands+Import',
          'https://placehold.co/400x400?text=Eco+Friendly+Biodegradable+Dish+Soap+Green+Label'
        ],
        stockLevel: 67,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: this.nextId.products++,
        name: 'Nettoyant Vitres Professional',
        nameAr: 'منظف النوافذ المهني',
        nameEn: 'Professional Glass Cleaner',
        description: 'Nettoyant vitres sans traces, spécialement conçu pour usage professionnel.',
        descriptionAr: 'منظف نوافذ بدون آثار، مصمم خصيصاً للاستخدام المهني.',
        descriptionEn: 'Streak-free glass cleaner, specially designed for professional use.',
        price: 8.45,
        category: 'cleaning-supplies',
        brand: 'ClearVision',
        origin: 'Italie',
        size: '750ml',
        images: [
          'https://placehold.co/400x400?text=ClearVision+Professional+Glass+Cleaner+750ml+Italian+Import',
          'https://placehold.co/400x400?text=Streak+Free+Glass+Cleaner+Professional+Formula'
        ],
        stockLevel: 23,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: this.nextId.products++,
        name: 'Éponges Abrasives Haute Performance',
        nameAr: 'إسفنج كاشط عالي الأداء',
        nameEn: 'High-Performance Abrasive Sponges',
        description: 'Pack de 10 éponges abrasives double face pour nettoyage intensif.',
        descriptionAr: 'عبوة من 10 إسفنجات كاشطة ذات وجهين للتنظيف المكثف.',
        descriptionEn: 'Pack of 10 double-sided abrasive sponges for intensive cleaning.',
        price: 15.20,
        category: 'household-items',
        brand: 'ScrubMaster',
        origin: 'Espagne',
        size: 'Pack 10 unités',
        images: [
          'https://placehold.co/400x400?text=ScrubMaster+Abrasive+Sponges+Pack+10+Units+Spanish+Import',
          'https://placehold.co/400x400?text=High+Performance+Double+Sided+Cleaning+Sponges'
        ],
        stockLevel: 89,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: this.nextId.products++,
        name: 'Dégraissant Industriel Ultra-Fort',
        nameAr: 'مزيل الدهون الصناعي فائق القوة',
        nameEn: 'Ultra-Strong Industrial Degreaser',
        description: 'Dégraissant professionnel pour machines et équipements industriels.',
        descriptionAr: 'مزيل دهون مهني للآلات والمعدات الصناعية.',
        descriptionEn: 'Professional degreaser for machines and industrial equipment.',
        price: 35.80,
        category: 'detergents',
        brand: 'InduClean',
        origin: 'Belgique',
        size: '10L',
        images: [
          'https://placehold.co/400x400?text=InduClean+Industrial+Degreaser+10L+Belgian+Import',
          'https://placehold.co/400x400?text=Ultra+Strong+Professional+Degreaser+Industrial+Use'
        ],
        stockLevel: 12,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );
  }

  // User methods
  getUserByClientId(clientId: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find(user => user.clientId === clientId && user.active) || null
    );
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<number> {
    const newUser: User = {
      ...user,
      id: this.nextId.users++,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return Promise.resolve(newUser.id);
  }

  // Product methods
  getAllProducts(): Promise<Product[]> {
    return Promise.resolve(this.products.filter(product => product.active));
  }

  getProductById(id: number): Promise<Product | null> {
    return Promise.resolve(
      this.products.find(product => product.id === id && product.active) || null
    );
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...product,
      id: this.nextId.products++,
      createdAt: now,
      updatedAt: now
    };
    this.products.push(newProduct);
    return Promise.resolve(newProduct.id);
  }

  updateProduct(id: number, updates: Partial<Product>): Promise<void> {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }
    return Promise.resolve();
  }

  // Order methods
  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...order,
      id: this.nextId.orders++,
      createdAt: now,
      updatedAt: now
    };
    this.orders.push(newOrder);
    return Promise.resolve(newOrder.orderId);
  }

  getOrdersByClientId(clientId: string): Promise<Order[]> {
    return Promise.resolve(
      this.orders.filter(order => order.clientId === clientId)
    );
  }

  getAllOrders(): Promise<Order[]> {
    return Promise.resolve([...this.orders]);
  }

  updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderIndex = this.orders.findIndex(o => o.orderId === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        status,
        updatedAt: new Date().toISOString()
      };
    }
    return Promise.resolve();
  }

  // Category methods
  getAllCategories(): Promise<Category[]> {
    return Promise.resolve(this.categories.filter(category => category.active));
  }
}

export default new SimpleDatabase();