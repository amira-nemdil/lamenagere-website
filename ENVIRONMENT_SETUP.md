# 🌍 Environment Setup Guide for Lamenagere Website

## 🚀 **Quick Setup (Choose Your Method)**

### **Method 1: Automated Installation (Recommended)**

#### **For Linux/macOS:**
```bash
chmod +x install.sh
./install.sh
```

#### **For Windows:**
```cmd
install.bat
```

### **Method 2: Manual Installation**

#### **Step 1: Install System Requirements**
```bash
# Check versions
node --version    # Must be 18.17.0+
npm --version     # Must be 9.0.0+
git --version     # Optional but recommended
```

#### **Step 2: Install Dependencies**
```bash
# Using npm
npm install

# OR using pnpm (faster, recommended)
npm install -g pnpm
pnpm install
```

#### **Step 3: Build & Test**
```bash
# Build application
npm run build

# Start production server
npm start

# OR start development server
npm run dev
```

## 📋 **Detailed System Requirements**

### **Required Software**

| Software | Minimum Version | Recommended | Purpose |
|----------|----------------|-------------|---------|
| **Node.js** | 18.17.0 | 20.x LTS | JavaScript runtime |
| **npm** | 9.0.0 | Latest | Package manager |
| **pnpm** | 8.0.0 | Latest | Fast package manager (optional) |
| **Git** | 2.20.0 | Latest | Version control (optional) |

### **Operating System Support**
- ✅ **Windows**: 10, 11
- ✅ **macOS**: 10.15 (Catalina) or newer
- ✅ **Linux**: Ubuntu 18.04+, CentOS 7+, Debian 10+

### **Hardware Requirements**
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 2GB free space
- **CPU**: Any modern processor (64-bit)

## 🔧 **Development Environment Setup**

### **Recommended Code Editor: VS Code**
```bash
# Install VS Code extensions
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension formulahendry.auto-rename-tag
```

### **VS Code Settings (settings.json)**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 🌐 **Environment Variables Setup**

### **Create .env.local file**
```bash
# JWT Secret (REQUIRED for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars

# Application URL (for production)
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Development settings
NODE_ENV=development
```

### **Production Environment Variables**
```bash
# Production settings
NODE_ENV=production
JWT_SECRET=use-a-strong-random-32-character-secret-key
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional: Database (for future upgrades)
# DATABASE_URL=postgresql://user:password@localhost:5432/lamenagere

# Optional: Email service
# EMAIL_SERVER_HOST=smtp.gmail.com
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER=your-email@gmail.com
# EMAIL_SERVER_PASSWORD=your-app-password

# Optional: File storage
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
```

## 📦 **Package Manager Comparison**

### **npm (Standard)**
```bash
# Install dependencies
npm install

# Run scripts  
npm run dev
npm run build
npm start
```

### **pnpm (Recommended - Faster)**
```bash
# Install pnpm
npm install -g pnpm

# Install dependencies (3x faster than npm)
pnpm install

# Run scripts
pnpm dev
pnpm build  
pnpm start
```

### **yarn (Alternative)**
```bash
# Install yarn
npm install -g yarn

# Install dependencies
yarn install

# Run scripts
yarn dev
yarn build
yarn start
```

## 🔍 **Troubleshooting Common Issues**

### **Node.js Version Issues**
```bash
# Check current version
node --version

# Install Node Version Manager (nvm)
# For Linux/macOS:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# For Windows (use nvm-windows):
# Download from: https://github.com/coreybutler/nvm-windows
```

### **Permission Issues (macOS/Linux)**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use nvm instead of global npm
```

### **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### **Port Already in Use**
```bash
# Kill process using port 3000
# Linux/macOS:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### **TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript
npm update typescript @types/node @types/react
```

## 🚀 **Deployment Preparation**

### **Build for Production**
```bash
# Create production build
npm run build

# Test production build locally
npm start

# Check build size and performance
npm run build -- --analyze
```

### **Pre-deployment Checklist**
- [ ] All dependencies installed
- [ ] Application builds without errors
- [ ] Environment variables configured
- [ ] Authentication works (test login)
- [ ] Multi-language switching works
- [ ] Responsive design tested
- [ ] All API endpoints respond correctly

## 🌐 **Deployment Options**

### **Vercel (Recommended)**
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### **Docker (Advanced)**
```dockerfile
# Dockerfile example
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## ✅ **Verification Steps**

### **Test Installation**
```bash
# 1. Build succeeds
npm run build
# Should complete without errors

# 2. Application starts
npm start
# Should show "Ready on http://localhost:3000"

# 3. Development mode works
npm run dev
# Should show development server started

# 4. Login works
# Visit http://localhost:3000
# Login with: ADMIN001 / password
```

### **Test Features**
- [ ] Login page loads and works
- [ ] Language switching (French/Arabic/English)
- [ ] Admin dashboard accessible
- [ ] Product catalog loads
- [ ] Arabic RTL layout works correctly
- [ ] Responsive design on mobile

## 🎯 **You're Ready!**

If all tests pass, your Lamenagere website is ready for development and deployment! 

**Next steps:**
1. Customize the branding and styling
2. Add your real product data
3. Set up production environment variables
4. Deploy to your preferred platform

 **Happy coding with your Lamenagere import products website!**