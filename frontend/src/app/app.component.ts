import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1 class="header">DevOps CI/CD Test Application</h1>
      <nav>
        <button class="btn" routerLink="/">Home</button>
        <button class="btn" routerLink="/users">Users</button>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    nav {
      margin: 20px 0;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'devops-frontend';
}