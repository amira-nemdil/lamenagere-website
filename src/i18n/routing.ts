import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'ar', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'fr',

  // The locale prefix for URLs
  localePrefix: 'always',

  // Pathnames for each locale
  pathnames: {
    '/': '/',
    '/products': {
      fr: '/produits',
      ar: '/المنتجات',
      en: '/products'
    },
    '/dashboard': {
      fr: '/tableau-de-bord',
      ar: '/لوحة-التحكم',
      en: '/dashboard'
    },
    '/admin': {
      fr: '/admin',
      ar: '/الإدارة',
      en: '/admin'
    }
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);