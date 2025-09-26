# DevOps CI/CD Test Application

A complete end-to-end solution demonstrating modern DevOps practices with Angular frontend, .NET Core 2 backend, and Azure DevOps CI/CD pipelines.

## 🚀 Quick Start

**New to this project?** Start with [`QUICKSTART.md`](QUICKSTART.md) for a 5-minute setup guide.

## 📁 Project Structure

```
DevOpsCI/
├── frontend/                    # Angular application
│   ├── src/app/
│   │   ├── components/         # Angular components
│   │   ├── services/           # API services
│   │   └── environments/       # Environment configs
│   ├── package.json
│   └── angular.json
├── backend/                     # .NET Core 2 Web API
│   ├── Controllers/            # API controllers
│   ├── Models/                 # Data models
│   ├── Properties/             # Launch settings
│   ├── DevOpsBackend.csproj
│   └── Startup.cs
├── .vscode/                    # VS Code configuration
├── azure-pipelines-build.yml   # Build pipeline
├── azure-pipelines-release.yml # Release pipeline
└── Documentation/
    ├── QUICKSTART.md           # 5-minute setup guide
    ├── AZURE_SETUP.md         # Detailed Azure setup
    ├── DEVELOPMENT.md         # Local development guide
    └── ARCHITECTURE.md        # Technical architecture
```

## 🎯 What's Included

### Applications
- **Angular Frontend**: Modern SPA with TypeScript, routing, and HTTP client
- **.NET Core 2 Backend**: RESTful Web API with Swagger documentation
- **Integration**: Complete frontend-backend communication setup

### DevOps Pipeline
- **Build Pipeline**: Automated builds, tests, and artifact creation
- **Release Pipeline**: Blue-green deployments with approval gates
- **Azure Integration**: Direct deployment to Azure App Services

### Documentation
- **Setup Guides**: From zero to deployed in minutes
- **Architecture Docs**: Technical details and diagrams  
- **Development Guide**: Local development workflow

## Local Development Setup

### Prerequisites
- Node.js 16+ and npm
- .NET Core 2.2 SDK
- Visual Studio Code or Visual Studio

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

The API will be available at `http://localhost:5000` and `https://localhost:5001`
Swagger documentation will be available at the root URL.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The Angular app will be available at `http://localhost:4200`

## Azure DevOps Pipeline Configuration

The project includes two pipeline files:
- `azure-pipelines-build.yml` - Build pipeline for both frontend and backend
- `azure-pipelines-release.yml` - Release pipeline for Azure App Service deployment

## Azure App Service Configuration

### Backend App Service
- Runtime: .NET Core 2.2
- Deployment method: Azure DevOps pipeline
- CORS configured for Angular frontend

### Frontend App Service
- Runtime: Node.js
- Deployment method: Azure DevOps pipeline
- Environment variables configured for API URL

## API Endpoints

### Status Endpoint
- `GET /api/status` - Returns API status and version information
- `GET /api/status/health` - Health check endpoint

### Users Endpoint
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure the backend CORS configuration includes your frontend URL
2. **API connection issues**: Check that the backend is running on the expected port
3. **Build failures**: Ensure all dependencies are properly installed

### Azure Deployment Issues
1. **App Service not starting**: Check application logs in Azure portal
2. **API not accessible**: Verify networking and firewall settings
3. **Database connection**: Ensure connection strings are properly configured