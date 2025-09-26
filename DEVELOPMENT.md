# Development and Testing Guide

## Local Development Environment

### Prerequisites Installation

#### Windows:
```powershell
# Install Chocolatey (package manager)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Node.js and npm
choco install nodejs

# Install .NET Core SDK
choco install dotnetcore-sdk --version=2.2.207

# Install Visual Studio Code
choco install vscode

# Install Git
choco install git
```

#### macOS:
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm
brew install node@16

# Install .NET Core SDK
brew install --cask dotnet-sdk

# Install Visual Studio Code
brew install --cask visual-studio-code

# Install Git
brew install git
```

#### Linux (Ubuntu/Debian):
```bash
# Update package manager
sudo apt update

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install .NET Core SDK
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y dotnet-sdk-2.2

# Install Visual Studio Code
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt install apt-transport-https
sudo apt update
sudo apt install code

# Install Git
sudo apt install git
```

### Project Setup

1. **Clone the repository:**
```bash
git clone <your-repository-url>
cd DevOpsCI
```

2. **Backend setup:**
```bash
cd backend
dotnet restore
dotnet build
```

3. **Frontend setup:**
```bash
cd ../frontend
npm install
```

### Running the Application Locally

#### Start Backend (Terminal 1):
```bash
cd backend
dotnet run
```
The API will be available at:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001
- Swagger UI: https://localhost:5001

#### Start Frontend (Terminal 2):
```bash
cd frontend
npm start
```
The Angular app will be available at: http://localhost:4200

### Testing the Integration

1. Open browser to http://localhost:4200
2. Click "Test API Connection" button
3. Navigate to "Users" page to see sample data
4. Check browser developer tools for network requests

## Development Workflow

### Git Workflow

1. **Create feature branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and commit:**
```bash
git add .
git commit -m "Add: your feature description"
```

3. **Push to remote:**
```bash
git push origin feature/your-feature-name
```

4. **Create Pull Request** in Azure DevOps

### Code Quality Standards

#### Frontend (Angular):
- Use Angular CLI for generating components
- Follow Angular style guide
- Use TypeScript strict mode
- Write unit tests for components and services
- Use ESLint for code linting

#### Backend (.NET Core):
- Follow C# coding conventions
- Use dependency injection
- Write unit tests for controllers and services
- Use Entity Framework for data access (if needed)
- Follow RESTful API design principles

### Testing Strategy

#### Frontend Testing:
```bash
# Run unit tests
npm test

# Run unit tests with coverage
npm test -- --code-coverage

# Run end-to-end tests
npm run e2e

# Run linting
npm run lint
```

#### Backend Testing:
```bash
# Run unit tests
dotnet test

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

## Environment Configuration

### Environment Variables

#### Frontend (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  enableLogging: true
};
```

#### Backend (`appsettings.Development.json`):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=devops.db"
  }
}
```

### Docker Support (Optional)

#### Backend Dockerfile:
```dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["DevOpsBackend.csproj", ""]
RUN dotnet restore "./DevOpsBackend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "DevOpsBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DevOpsBackend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DevOpsBackend.dll"]
```

#### Frontend Dockerfile:
```dockerfile
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY --from=build /app/dist/devops-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
  
  frontend:
    build: ./frontend
    ports:
      - "4200:80"
    depends_on:
      - backend
```

## Debugging and Troubleshooting

### Common Issues

#### "Cannot connect to API" Error:
1. Check if backend is running on correct port
2. Verify CORS configuration in Startup.cs
3. Check browser network tab for exact error
4. Ensure firewall is not blocking connections

#### Build Failures:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
3. For .NET: `dotnet clean && dotnet restore`

#### HTTPS Issues in Development:
```bash
# Trust .NET Core development certificate
dotnet dev-certs https --trust
```

### Performance Optimization

#### Frontend:
- Use OnPush change detection strategy
- Implement lazy loading for routes
- Optimize bundle size with tree shaking
- Use Angular Service Workers for caching

#### Backend:
- Enable response caching
- Use async/await for I/O operations
- Implement proper logging levels
- Monitor memory usage and garbage collection

### Security Best Practices

1. **Never commit secrets** to version control
2. **Use HTTPS** in production
3. **Validate all inputs** on both client and server
4. **Implement proper CORS** policies
5. **Use authentication and authorization** as needed
6. **Keep dependencies updated** regularly

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [.NET Core Documentation](https://docs.microsoft.com/en-us/dotnet/core/)
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/)
- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)