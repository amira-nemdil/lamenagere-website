# 📦 Lamenagere Website - Complete Requirements & Dependencies

## 🔧 **System Requirements**

### **Minimum System Requirements**
- **Node.js**: 18.17.0 or higher
- **npm**: 9.0.0 or higher (or **pnpm**: 8.0.0+ recommended)
- **Git**: 2.20.0 or higher
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 2GB free space

### **Recommended Development Environment**
- **Node.js**: 20.x LTS (latest stable)
- **Package Manager**: pnpm 8.x (faster than npm)
- **Code Editor**: VS Code with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Auto Rename Tag
  - Prettier - Code formatter

## 📋 **Production Dependencies**

### **Core Framework & React**
```json
{
  "next": "^14.2.16",           // Next.js framework
  "react": "^18.3.1",           // React library
  "react-dom": "^18.3.1",       // React DOM
  "@next/third-parties": "^14.2.16"  // Next.js third-party integrations
}
```

### **UI Components & Styling**
```json
{
  "tailwindcss": "^3.4.14",         // Utility-first CSS framework
  "tailwindcss-animate": "^1.0.7",  // Animation utilities
  "class-variance-authority": "^0.7.1", // Component variants
  "clsx": "^2.1.1",                 // Conditional classNames
  "tailwind-merge": "^2.5.4"        // Tailwind class merging
}
```

### **Radix UI Components (shadcn/ui)**
```json
{
  "@radix-ui/react-accordion": "^1.2.1",
  "@radix-ui/react-alert-dialog": "^1.1.2",
  "@radix-ui/react-aspect-ratio": "^1.1.0",
  "@radix-ui/react-avatar": "^1.1.1",
  "@radix-ui/react-checkbox": "^1.1.2",
  "@radix-ui/react-collapsible": "^1.1.1",
  "@radix-ui/react-context-menu": "^2.2.2",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.2",
  "@radix-ui/react-hover-card": "^1.1.2",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-menubar": "^1.1.2",
  "@radix-ui/react-navigation-menu": "^1.2.1",
  "@radix-ui/react-popover": "^1.1.2",
  "@radix-ui/react-progress": "^1.1.0",
  "@radix-ui/react-radio-group": "^1.2.1",
  "@radix-ui/react-scroll-area": "^1.2.0",
  "@radix-ui/react-select": "^2.1.2",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slider": "^1.2.1",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.1",
  "@radix-ui/react-tabs": "^1.1.1",
  "@radix-ui/react-toast": "^1.2.2",
  "@radix-ui/react-toggle": "^1.1.0",
  "@radix-ui/react-toggle-group": "^1.1.0",
  "@radix-ui/react-tooltip": "^1.1.3"
}
```

### **Additional UI Libraries**
```json
{
  "embla-carousel-react": "^8.3.0",  // Carousel/slider component
  "input-otp": "^1.4.1",            // OTP input component
  "next-themes": "^0.4.4",          // Theme switching
  "recharts": "^2.13.3",            // Charts and graphs
  "sonner": "^1.7.0",               // Toast notifications
  "vaul": "^1.1.1"                  // Drawer component
}
```

### **Internationalization (Multi-language)**
```json
{
  "next-intl": "^3.22.0"            // Next.js internationalization
}
```

### **Authentication & Security**
```json
{
  "bcryptjs": "^2.4.3",            // Password hashing
  "jose": "^5.9.6"                 // JWT tokens
}
```

### **File Upload & Processing**
```json
{
  "multer": "^1.4.5-lts.1",        // File upload handling
  "sharp": "^0.33.5"               // Image processing
}
```

## 🛠️ **Development Dependencies**

### **TypeScript & Type Definitions**
```json
{
  "typescript": "^5.6.3",
  "@types/node": "^22.10.1",
  "@types/react": "^18.3.12",
  "@types/react-dom": "^18.3.1",
  "@types/bcryptjs": "^2.4.6",
  "@types/multer": "^1.4.12"
}
```

### **Build Tools & CSS Processing**
```json
{
  "postcss": "^8.5.1",
  "autoprefixer": "^10.4.21",
  "tailwindcss": "^3.4.14"
}
```

### **Code Quality & Linting**
```json
{
  "eslint": "^8.57.1",
  "eslint-config-next": "^14.2.16"
}
```

## 🚀 **Installation Commands**

### **Using npm (Standard)**
```bash
# Install Node.js dependencies
npm install

# Install additional development tools (optional)
npm install -D prettier eslint-config-prettier
```

### **Using pnpm (Recommended - Faster)**
```bash
# Install pnpm globally first
npm install -g pnpm

# Install dependencies
pnpm install

# Install additional development tools (optional)
pnpm add -D prettier eslint-config-prettier
```

### **Using yarn (Alternative)**
```bash
# Install dependencies
yarn install

# Install additional development tools (optional)
yarn add -D prettier eslint-config-prettier
```

## 🌐 **External Services & APIs (Optional)**

### **For Production Enhancement**
- **Database**: PostgreSQL, MySQL, or MongoDB Atlas
- **Image Storage**: AWS S3, Cloudinary, or Vercel Blob
- **Email Service**: SendGrid, Mailgun, or Resend
- **Analytics**: Google Analytics, Plausible, or Vercel Analytics
- **Monitoring**: Sentry for error tracking

### **Deployment Platforms**
- **Vercel** (recommended) - Automatic deployments
- **Netlify** - Alternative hosting
- **AWS Amplify** - Full-stack hosting
- **Railway** - Database and hosting
- **PlanetScale** - Serverless database

## 📁 **Project Structure Requirements**

### **Required Directories**
```
lamenagere-website/
├── src/                 # Source code
├── messages/           # Translation files
├── public/             # Static assets (auto-created)
├── .next/              # Build output (auto-created)
└── node_modules/       # Dependencies (auto-created)
```

### **Required Configuration Files**
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration

## 🔧 **Environment Setup**

### **Environment Variables (.env.local)**
```bash
# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Optional: Database (for future upgrades)
# DATABASE_URL=postgresql://user:password@localhost:5432/lamenagere

# Optional: File Upload (for cloud storage)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
```

### **Git Configuration**
```bash
# Set up git (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## ✅ **Verification Commands**

### **Check Versions**
```bash
node --version          # Should be 18.17.0+
npm --version           # Should be 9.0.0+
git --version           # Should be 2.20.0+
```

### **Test Installation**
```bash
npm run build          # Build the application
npm run start          # Start production server
# or
npm run dev            # Start development server
```

### **Test Application**
```bash
# Open browser to http://localhost:3000
# Login with: ADMIN001 / password or CLIENT001 / password
```

## 🐛 **Troubleshooting**

### **Common Issues & Solutions**

#### **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

#### **TypeScript Errors**
```bash
# Check TypeScript version
npx tsc --version

# Fix type issues
npm run type-check
```

#### **Styling Issues**
```bash
# Rebuild Tailwind CSS
npx tailwindcss build -i ./src/app/globals.css -o ./dist/output.css
```

#### **Permission Issues (macOS/Linux)**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

## 📚 **Additional Resources**

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🎯 **Ready to Deploy!**

Once all dependencies are installed and the application builds successfully, your Lamenagere website is ready for production deployment!