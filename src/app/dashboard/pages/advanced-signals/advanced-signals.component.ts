import { Component, computed, effect, linkedSignal, signal, untracked } from '@angular/core';

interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

@Component({
    selector: 'app-advanced-signals',
    template: `
    <div class="p-6 space-y-6">
        <h2 class="text-2xl font-bold">Advanced Signal Patterns</h2>
        
        <!-- Signal with complex state -->
        <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-2">Complex State Management</h3>
            <p>Active users: {{ activeUsersCount() }}</p>
            <p>Total users: {{ users().length }}</p>
            <p>User names: {{ userNames() }}</p>

            <button 
              class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              (click)="addUser()"
            >
              Add User
            </button>

            <button 
              class="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded"
              (click)="toggleUserStatus()"
            >
              Toggle First User Status
            </button>
        </div>
    
        <!-- Computed with dependencies -->
        <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-2">Computed Dependencies</h3>
            <p>Filter: {{ filter() }}</p>
            <p>Filtered users: {{ filteredUsers().length }}</p>
            
            <select 
              class="mt-2 p-2 border rounded"
              [value]="filter()"
              (change)="filter.set($any($event.target).value)"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
        </div>
    
        <!-- Effect for side effects -->
        <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-2">Effects & Reactions</h3>
            <p>Effect counter: {{ effectCounter() }}</p>
            <p class="text-sm text-gray-600">Check console for effect logs</p>
        </div>
    
        <!-- Async signals -->
        <div class="bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-2">Async Data Loading</h3>
            <p>Loading state: {{ loadingState() }}</p>
            @if (loadingState() === 'loading') {
              <p class="text-blue-600">Loading...</p>
            }
            @if (loadingState() === 'success') {
              <p class="text-green-600">Data loaded successfully!</p>
            }
            @if (loadingState() === 'error') {
              <p class="text-red-600">Error loading data</p>
            }

            <button 
              class="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
              (click)="simulateAsyncLoad()"
            >
              Simulate Async Load
            </button>
        </div>
        
        <div class="bg-white p-4 rounded shadow"
            [class.bg-gray-900]="effectiveTheme() === 'dark'"
            [class.bg-white]="effectiveTheme() === 'light'"
            [class.text-white]="effectiveTheme() === 'dark'"
            [class.text-black]="effectiveTheme() === 'light'"
        >
            <h3 class="font-semibold mb-2">Linked signal - Theme settings</h3>
            <p class="block font-semibold">Global theme: {{ globalTheme() }}</p>
            
            <select 
                [value]="globalTheme()"
                (change)="globalTheme.set($any($event.target).value)"
                class="border p-2 rounded"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
            </select>
            
            <div>
                <label class="block font-semibold">Component Theme Override:</label>
                <select 
                  [value]="componentTheme()"
                  (change)="componentTheme.set($any($event.target).value)"
                  class="border p-2 rounded"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>

                <button 
                  class="ml-2 px-3 py-1 bg-gray-500 text-white rounded text-sm"
                  (click)="resetComponentTheme()"
                >
                  Reset to Global
                </button>
            </div>
            
            <p>Current effective theme: {{ effectiveTheme() }}</p>
            <p>Global: {{ globalTheme() }}</p>
            <p>Component: {{ componentTheme() }}</p>
        </div>
    </div>
  `,
})
export default class AdvancedSignalsComponent {
    // Complex state signal
    users = signal<User[]>([
        { id: 1, name: 'John', email: 'john@example.com', isActive: true },
        { id: 2, name: 'Jane', email: 'jane@example.com', isActive: false },
    ]);

    // Filter signal
    filter = signal<'all' | 'active' | 'inactive'>('all');

    // Computed signals with complex logic
    activeUsersCount = computed(() =>
        this.users().filter(user => user.isActive).length
    );

    userNames = computed(() =>
        this.users().map(user => user.name).join(', ')
    );

    filteredUsers = computed(() => {
        const users = this.users();
        const filterValue = this.filter();

        switch (filterValue) {
            case 'active':
                return users.filter(user => user.isActive);
            case 'inactive':
                return users.filter(user => !user.isActive);
            default:
                return users;
        }
    });

    // Effect counter for demonstration
    effectCounter = signal(0);

    // Async state signal
    loadingState = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

    //Linked signal example with themes
    globalTheme = signal<'light' | 'dark' | 'auto'>('light');
    componentTheme = linkedSignal(() => this.globalTheme());

    effectiveTheme = computed(() => {
        return this.componentTheme() === 'auto' ? 'light' : this.componentTheme();
    });

    resetComponentTheme = () => {
        this.componentTheme.set(this.globalTheme());
    };

    constructor() {
        // Effect that runs when users change
        effect(() => {
            const userCount = this.users().length;

            // Use untracked to prevent infinite loops
            untracked(() => {
                console.log(`Users changed. Current count: ${userCount}`);
                this.effectCounter.update(count => count + 1);
            });
        });

        // Effect for logging filter changes
        effect(() => {
            console.log(`Filter changed to: ${this.filter()}`);
        });
    }

    addUser() {
        this.users.update(users => [
            ...users,
            {
                id: users.length + 1,
                name: `User ${users.length + 1}`,
                email: `user${users.length + 1}@example.com`,
                isActive: Math.random() > 0.5
            }
        ]);
    }

    toggleUserStatus() {
        this.users.update(users =>
            users.map((user, index) =>
                index === 0 ? { ...user, isActive: !user.isActive } : user
            )
        );
    }

    async simulateAsyncLoad() {
        this.loadingState.set('loading');

        try {
            // Simulate async operation
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (Math.random() > 0.3) {
                this.loadingState.set('success');
            } else {
                this.loadingState.set('error');
            }
        } catch (error) {
            this.loadingState.set('error');
        }
    }
}
