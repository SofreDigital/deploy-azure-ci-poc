import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  template: `
    <div class="card">
      <h2>Users Management</h2>
      
      <button class="btn" (click)="loadUsers()">Refresh Users</button>
      
      <div *ngIf="loading" class="loading">
        Loading users...
      </div>
      
      <div *ngIf="error" class="error">
        <strong>Error:</strong> {{ error }}
      </div>
      
      <div *ngIf="users && users.length > 0">
        <h3>Users List ({{ users.length }} users)</h3>
        <div *ngFor="let user of users" class="card">
          <h4>{{ user.name }}</h4>
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
      </div>
      
      <div *ngIf="users && users.length === 0 && !loading">
        <p>No users found.</p>
      </div>
    </div>
  `,
  styles: [`
    .card + .card {
      margin-top: 10px;
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = `Failed to load users: ${err.message}`;
        this.loading = false;
      }
    });
  }
}