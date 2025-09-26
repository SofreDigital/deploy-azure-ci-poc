import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="card">
      <h2>Welcome to DevOps Test Application</h2>
      <p>This is a sample Angular frontend application that communicates with a .NET Core 2 Web API backend.</p>
      
      <h3>API Status</h3>
      <button class="btn" (click)="testApiConnection()">Test API Connection</button>
      
      <div *ngIf="loading" class="loading">
        Testing API connection...
      </div>
      
      <div *ngIf="apiStatus" class="card">
        <h4>API Response:</h4>
        <pre>{{ apiStatus | json }}</pre>
      </div>
      
      <div *ngIf="error" class="error">
        <strong>Error:</strong> {{ error }}
      </div>
    </div>
  `,
  styles: [`
    pre {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class HomeComponent implements OnInit {
  apiStatus: any = null;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Test API connection on component load
    this.testApiConnection();
  }

  testApiConnection(): void {
    this.loading = true;
    this.error = null;
    this.apiStatus = null;

    this.apiService.getStatus().subscribe({
      next: (response) => {
        this.apiStatus = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Failed to connect to API: ${err.message}`;
        this.loading = false;
      }
    });
  }
}