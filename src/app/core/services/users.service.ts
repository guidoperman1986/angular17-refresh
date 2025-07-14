import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '../../types/req-res.interface';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: any;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #state = signal<State>({
    loading: true,
    users: [],
  });

  users = computed(() => this.#state().users);
  loading = computed(() => this.#state().loading);

  http = inject(HttpClient);

  constructor() {
    this.http
      .get<UsersResponse>('https://reqres.in/api/users')
      .pipe(delay(300))
      .subscribe({
        next: (response) => {
          this.#state.set({
            loading: false,
            users: response.data,
          });
        },
      });
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>('https://reqres.in/api/users/' + id).pipe(
      delay(300),
      map((response) => response.data)
    );
  }
}
