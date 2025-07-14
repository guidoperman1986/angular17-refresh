# 🏗️ Angular Project Structure

This document outlines the recommended project structure following Angular 17+ best practices with standalone components and signals.

## 📁 Directory Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors
│   ├── services/           # App-wide services (auth, api, etc.)
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   └── index.ts           # Barrel exports
├── shared/                 # Reusable components, directives, pipes
│   ├── components/        # Reusable UI components
│   ├── directives/        # Custom directives
│   ├── pipes/             # Custom pipes
│   ├── utils/             # Utility functions
│   └── index.ts          # Barrel exports
├── features/              # Feature modules (lazy-loaded)
│   ├── dashboard/         # Dashboard feature
│   ├── user-management/   # User management feature
│   └── analytics/         # Analytics feature
├── types/                 # TypeScript type definitions
│   ├── api.types.ts      # API response types
│   ├── user.types.ts     # User-related types
│   └── index.ts          # Barrel exports
├── app.component.ts       # Root component
├── app.config.ts          # App configuration
└── app.routes.ts          # App routing
```

## 🎯 Structure Principles

### **Core Folder**
- **Single responsibility**: Each service has one purpose
- **Singleton services**: Provided in root
- **App-wide concerns**: Authentication, logging, HTTP handling

### **Shared Folder**
- **Reusable components**: Used across multiple features
- **Pure components**: No business logic, only presentation
- **Standalone components**: Easy to import anywhere

### **Features Folder**
- **Feature-based organization**: Group by business domain
- **Lazy loading**: Each feature can be lazy-loaded
- **Self-contained**: Feature has its own components, services, types

### **Types Folder**
- **Strong typing**: Comprehensive TypeScript definitions
- **Domain-specific**: Organized by business domain
- **Barrel exports**: Easy imports with index.ts

## 🚀 Benefits

1. **Scalability**: Easy to add new features
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Shared components are easily accessible
4. **Performance**: Lazy loading of features
5. **Type Safety**: Comprehensive TypeScript coverage
6. **Team Collaboration**: Clear conventions for all developers

## 📝 File Naming Conventions

- **Components**: `feature-name.component.ts`
- **Services**: `feature-name.service.ts`
- **Types**: `feature-name.types.ts`
- **Guards**: `feature-name.guard.ts`
- **Pipes**: `feature-name.pipe.ts`
- **Directives**: `feature-name.directive.ts`

## 🔧 Migration Guide

When migrating existing code:

1. Move singleton services to `core/services/`
2. Move reusable components to `shared/components/`
3. Group related features under `features/`
4. Extract types to `types/` folder
5. Create barrel exports for easy imports
