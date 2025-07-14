import { Component, computed, signal } from '@angular/core';

// Modern TypeScript patterns for Angular 20+

// 1. Template literal types
type Theme = 'light' | 'dark' | 'auto';
type Size = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = `${Theme}-${Size}`;

// 2. Branded types for type safety
type UserId = number & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };

// 3. Utility types with generics
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

interface User {
  id: UserId;
  email: Email;
  name: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: Theme;
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
}

// 4. Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiData<T> = T extends ApiResponse<infer U> ? U : never;

// 5. Mapped types
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserKeys = keyof User;

// 6. Discriminated unions
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

@Component({
  selector: 'app-typescript-patterns',
  template: `
    <div class="p-6 space-y-6">
      <h2 class="text-2xl font-bold">Modern TypeScript Patterns</h2>
      
      <!-- Type-safe theme selection -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Type-Safe Theme</h3>
        <p>Current theme: {{ currentTheme() }}</p>
        <p>Button variant: {{ buttonVariant() }}</p>
        
        <select 
          class="mt-2 p-2 border rounded"
          [value]="currentTheme()"
          (change)="setTheme($any($event.target).value)"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <!-- Loading state with discriminated unions -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Loading State</h3>
        
        @switch (loadingState().status) {
          @case ('idle') {
            <p class="text-gray-600">Ready to load</p>
          }
          @case ('loading') {
            <p class="text-blue-600">Loading users...</p>
          }
          @case ('success') {
            <p class="text-green-600">
              Loaded {{ successData().length }} users
            </p>
          }
          @case ('error') {
            <p class="text-red-600">Error: {{ errorMessage() }}</p>
          }
        }
        
        <button 
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          (click)="loadUsers()"
        >
          Load Users
        </button>
      </div>

      <!-- Type-safe form handling -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Type-Safe Forms</h3>
        <p>Form valid: {{ isFormValid() }}</p>
        <p>Validation errors: {{ validationErrors().join(', ') }}</p>
        
        <form class="space-y-2">
          <input 
            type="text" 
            placeholder="Name"
            class="w-full p-2 border rounded"
            [value]="formData().name"
            (input)="updateForm('name', $any($event.target).value)"
          />
          <input 
            type="email" 
            placeholder="Email"
            class="w-full p-2 border rounded"
            [value]="formData().email"
            (input)="updateForm('email', $any($event.target).value)"
          />
        </form>
      </div>

      <!-- Generic utilities -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Generic Utilities</h3>
        <p>Cache size: {{ cache().size }}</p>
        <p>Cache keys: {{ getCacheKeys() }}</p>
        
        <button 
          class="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
          (click)="addToCache()"
        >
          Add to Cache
        </button>
      </div>
    </div>
  `,
})
export default class TypeScriptPatternsComponent {
  // Signal with typed state
  currentTheme = signal<Theme>('light');
  currentSize = signal<Size>('md');
  
  // Computed with template literal types
  buttonVariant = computed<ButtonVariant>(() => 
    `${this.currentTheme()}-${this.currentSize()}` as ButtonVariant
  );

  // Signal with discriminated union
  loadingState = signal<LoadingState>({ status: 'idle' });

  // Form state with partial types
  formData = signal<Partial<Pick<User, 'name' | 'email'>>>({
    name: '',
    email: '' as Email
  });

  // Generic cache
  cache = signal<Map<string, unknown>>(new Map());

  // Computed for type-safe access to discriminated union
  successData = computed(() => {
    const state = this.loadingState();
    return state.status === 'success' ? state.data : [];
  });

  errorMessage = computed(() => {
    const state = this.loadingState();
    return state.status === 'error' ? state.error : '';
  });

  // Computed validations
  isFormValid = computed(() => {
    const data = this.formData();
    return !!(data.name && data.email && this.isValidEmail(data.email));
  });

  validationErrors = computed(() => {
    const errors: string[] = [];
    const data = this.formData();
    
    if (!data.name) errors.push('Name is required');
    if (!data.email) errors.push('Email is required');
    else if (!this.isValidEmail(data.email)) errors.push('Invalid email format');
    
    return errors;
  });

  getCacheKeys = computed(() => 
    Array.from(this.cache().keys()).join(', ')
  );

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  async loadUsers() {
    this.loadingState.set({ status: 'loading' });
    
    try {
      // Simulate API call
      await this.delay(1500);
      
      if (Math.random() > 0.3) {
        const users: User[] = [
          { 
            id: 1 as UserId, 
            email: 'user1@example.com' as Email, 
            name: 'User 1',
            preferences: { theme: 'light', language: 'en', notifications: true }
          },
          { 
            id: 2 as UserId, 
            email: 'user2@example.com' as Email, 
            name: 'User 2',
            preferences: { theme: 'dark', language: 'es', notifications: false }
          }
        ];
        
        this.loadingState.set({ status: 'success', data: users });
      } else {
        this.loadingState.set({ status: 'error', error: 'Failed to load users' });
      }
    } catch (error) {
      this.loadingState.set({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }

  updateForm<K extends keyof Pick<User, 'name' | 'email'>>(
    key: K, 
    value: Pick<User, 'name' | 'email'>[K]
  ) {
    this.formData.update(data => ({ ...data, [key]: value }));
  }

  addToCache() {
    this.cache.update(cache => {
      const newCache = new Map(cache);
      newCache.set(`key-${Date.now()}`, { timestamp: Date.now() });
      return newCache;
    });
  }

  // Generic utility functions
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Type guard example
  private isSuccessState(state: LoadingState): state is { status: 'success'; data: User[] } {
    return state.status === 'success';
  }
}
