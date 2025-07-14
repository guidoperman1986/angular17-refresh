import { Component, computed, signal, effect } from '@angular/core';
import { delay, map, of, switchMap, catchError, EMPTY } from 'rxjs';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

type AsyncState<T> = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: string;
};

@Component({
  selector: 'app-resource-patterns',
  template: `
    <div class="p-6 space-y-6">
      <h2 class="text-2xl font-bold">Modern Async Patterns</h2>
      
      <!-- Signal-based Resource Pattern -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Signal-Based Resource</h3>
        
        @switch (postsState().status) {
          @case ('loading') {
            <p class="text-blue-600">Loading posts...</p>
          }
          @case ('success') {
            <div class="space-y-2">
              @for (post of postsState().data || []; track post.id) {
                <div class="p-2 bg-gray-50 rounded">
                  <h4 class="font-medium">{{ post.title }}</h4>
                  <p class="text-sm text-gray-600">{{ post.body }}</p>
                </div>
              }
            </div>
          }
          @case ('error') {
            <p class="text-red-600">Error: {{ postsState().error }}</p>
          }
        }
        
        <button 
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          (click)="loadPosts()"
        >
          Load Posts
        </button>
      </div>

      <!-- Dependent Loading Pattern -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Dependent Loading</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Select User:</label>
          <select 
            class="p-2 border rounded"
            [value]="selectedUserId()"
            (change)="selectedUserId.set(+$any($event.target).value)"
          >
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
        </div>

        @switch (userPostsState().status) {
          @case ('loading') {
            <p class="text-blue-600">Loading user posts...</p>
          }
          @case ('success') {
            <div class="space-y-2">
              <p class="font-medium">Posts by User {{ selectedUserId() }}:</p>
              @for (post of userPostsState().data || []; track post.id) {
                <div class="p-2 bg-blue-50 rounded">
                  <h4 class="font-medium">{{ post.title }}</h4>
                </div>
              }
            </div>
          }
          @case ('error') {
            <p class="text-red-600">Error loading user posts</p>
          }
        }
      </div>

      <!-- Debounced Search Pattern -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Debounced Search</h3>
        
        <div class="mb-4">
          <input 
            type="text" 
            placeholder="Search posts..."
            class="w-full p-2 border rounded"
            [value]="searchTerm()"
            (input)="searchTerm.set($any($event.target).value)"
          />
        </div>

        @switch (searchState().status) {
          @case ('loading') {
            <p class="text-blue-600">Searching...</p>
          }
          @case ('success') {
            <div class="space-y-2">
              @if ((searchState().data || []).length === 0) {
                <p class="text-gray-500">No posts found</p>
              } @else {
                @for (post of searchState().data || []; track post.id) {
                  <div class="p-2 bg-green-50 rounded">
                    <h4 class="font-medium">{{ post.title }}</h4>
                  </div>
                }
              }
            </div>
          }
          @case ('error') {
            <p class="text-red-600">Search error occurred</p>
          }
        }
      </div>

      <!-- Optimistic Updates Pattern -->
      <div class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Optimistic Updates</h3>
        
        <div class="mb-4">
          <input 
            type="text" 
            placeholder="New post title..."
            class="w-full p-2 border rounded"
            [value]="newPostTitle()"
            (input)="newPostTitle.set($any($event.target).value)"
          />
          <button 
            class="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            (click)="addPost()"
            [disabled]="!newPostTitle().trim()"
          >
            Add Post (Optimistic)
          </button>
        </div>

        <div class="space-y-2">
          @for (post of optimisticPosts(); track post.id) {
            <div class="p-2 rounded" [class]="post.isPending ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'">
              <h4 class="font-medium">{{ post.title }}</h4>
              @if (post.isPending) {
                <p class="text-sm text-yellow-600">Saving...</p>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export default class ResourcePatternsComponent {
  // State signals
  postsState = signal<AsyncState<Post[]>>({ status: 'idle' });
  userPostsState = signal<AsyncState<Post[]>>({ status: 'idle' });
  searchState = signal<AsyncState<Post[]>>({ status: 'idle' });
  
  // Input signals
  selectedUserId = signal(1);
  searchTerm = signal('');
  newPostTitle = signal('');

  // Optimistic updates
  optimisticPosts = signal<(Post & { isPending?: boolean })[]>([]);

  // Debounced search effect
  private searchDebounceTimer: any;

  constructor() {
    // Auto-load user posts when userId changes
    effect(() => {
      const userId = this.selectedUserId();
      this.loadUserPosts(userId);
    });

    // Debounced search effect
    effect(() => {
      const term = this.searchTerm();
      
      // Clear previous timer
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }

      // Set new timer
      this.searchDebounceTimer = setTimeout(() => {
        this.searchPosts(term);
      }, 300);
    });
  }

  async loadPosts() {
    this.postsState.set({ status: 'loading' });
    
    try {
      const posts = await this.mockLoadPosts();
      this.postsState.set({ status: 'success', data: posts });
    } catch (error) {
      this.postsState.set({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Failed to load posts' 
      });
    }
  }

  async loadUserPosts(userId: number) {
    this.userPostsState.set({ status: 'loading' });
    
    try {
      const posts = await this.mockLoadUserPosts(userId);
      this.userPostsState.set({ status: 'success', data: posts });
    } catch (error) {
      this.userPostsState.set({ 
        status: 'error', 
        error: 'Failed to load user posts' 
      });
    }
  }

  async searchPosts(term: string) {
    if (!term.trim()) {
      this.searchState.set({ status: 'success', data: [] });
      return;
    }

    this.searchState.set({ status: 'loading' });
    
    try {
      const posts = await this.mockSearchPosts(term);
      this.searchState.set({ status: 'success', data: posts });
    } catch (error) {
      this.searchState.set({ 
        status: 'error', 
        error: 'Search failed' 
      });
    }
  }

  async addPost() {
    const title = this.newPostTitle().trim();
    if (!title) return;

    // Optimistic update
    const optimisticPost: Post & { isPending: boolean } = {
      id: Date.now(),
      title,
      body: `Content for ${title}`,
      userId: 1,
      isPending: true
    };

    this.optimisticPosts.update(posts => [...posts, optimisticPost]);
    this.newPostTitle.set('');

    try {
      // Simulate API call
      await this.delay(2000);
      
      // Update with real data
      this.optimisticPosts.update(posts => 
        posts.map(post => 
          post.id === optimisticPost.id 
            ? { ...post, isPending: false }
            : post
        )
      );
    } catch (error) {
      // Remove optimistic post on error
      this.optimisticPosts.update(posts => 
        posts.filter(post => post.id !== optimisticPost.id)
      );
    }
  }

  // Mock API methods
  private async mockLoadPosts(): Promise<Post[]> {
    await this.delay(1000);
    return [
      { id: 1, title: 'Post 1', body: 'Content of post 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Content of post 2', userId: 2 },
      { id: 3, title: 'Post 3', body: 'Content of post 3', userId: 1 },
      { id: 4, title: 'Post 4', body: 'Content of post 4', userId: 3 },
      { id: 5, title: 'Post 5', body: 'Content of post 5', userId: 2 },
    ];
  }

  private async mockLoadUserPosts(userId: number): Promise<Post[]> {
    await this.delay(800);
    const allPosts = await this.mockLoadPosts();
    return allPosts.filter(post => post.userId === userId);
  }

  private async mockSearchPosts(term: string): Promise<Post[]> {
    await this.delay(500);
    const allPosts = [
      { id: 1, title: 'Angular Signals', body: 'Learn about signals', userId: 1 },
      { id: 2, title: 'TypeScript Tips', body: 'Advanced TypeScript', userId: 2 },
      { id: 3, title: 'Angular Resources', body: 'New Resource API', userId: 1 },
      { id: 4, title: 'Web Development', body: 'Modern web dev', userId: 3 },
    ];
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.body.toLowerCase().includes(term.toLowerCase())
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
