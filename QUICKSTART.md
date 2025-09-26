# DevOps Test Application - Quick Start Guide

## Overview
This is a complete DevOps CI/CD solution demonstrating modern application development and deployment practices using Angular, .NET Core 2, and Azure DevOps.

## What's Included
- **Angular Frontend**: Modern SPA with TypeScript
- **NET Core 2 Backend**: RESTful Web API
- **Azure DevOps Pipelines**: Complete CI/CD automation
- **Azure App Service**: Cloud hosting platform
- **Documentation**: Comprehensive setup and usage guides

## Architecture
```
Angular Frontend ←→ .NET Core API ←→ Azure App Services
         ↑                              ↑
         └──── Azure DevOps Pipelines ──┘
```

## Quick Setup (5 minutes)

### 1. Prerequisites
- Azure subscription
- Azure DevOps organization
- Git repository

### 2. Deploy Azure Resources
```bash
# Create resource group and app services
az group create --name devops-test-rg --location "East US"
az appservice plan create --name devops-plan --resource-group devops-test-rg --sku B1
az webapp create --name devops-backend-$(date +%s) --resource-group devops-test-rg --plan devops-plan --runtime "DOTNETCORE|2.2"
az webapp create --name devops-frontend-$(date +%s) --resource-group devops-test-rg --plan devops-plan --runtime "NODE|16-lts"
```

### 3. Setup Azure DevOps
1. Create new project in Azure DevOps
2. Import this repository
3. Create service connection to Azure
4. Create build pipeline using `azure-pipelines-build.yml`
5. Create release pipeline using `azure-pipelines-release.yml`

### 4. Configure Variables
In Azure DevOps pipeline variables:
- `azureSubscription`: Your service connection name
- `backendAppService`: Your backend app service name  
- `frontendAppService`: Your frontend app service name
- `resourceGroupName`: devops-test-rg

### 5. Run Pipeline
Push code to main branch to trigger automatic build and deployment.

## Application Features

### Frontend (http://your-frontend-app.azurewebsites.net)
- **Home Page**: API connection testing and status
- **Users Page**: Display sample data from backend API
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: User-friendly error messages

### Backend API (http://your-backend-app.azurewebsites.net)
- **Swagger UI**: Interactive API documentation (root URL)
- **Status Endpoint**: `/api/status` - Health and version info
- **Users API**: `/api/users` - CRUD operations for user data
- **CORS Enabled**: Configured for frontend integration

## Pipeline Features

### Build Pipeline
- ✅ Parallel builds for frontend and backend
- ✅ Automated testing and linting
- ✅ Security scanning with SonarCloud
- ✅ Artifact generation and publishing
- ✅ npm and NuGet package caching

### Release Pipeline  
- ✅ Blue-green deployment with staging slots
- ✅ Automated smoke testing
- ✅ Production approval gates
- ✅ Rollback capabilities
- ✅ Environment-specific configurations

## Testing the Solution

### 1. Verify Build Pipeline
Check that both frontend and backend build successfully:
- Navigate to Pipelines → Builds
- Verify latest build is green
- Check artifacts are published

### 2. Verify Release Pipeline
Check staging and production deployments:
- Navigate to Pipelines → Releases
- Verify staging deployment succeeded
- Approve production deployment
- Verify both environments are healthy

### 3. Test Application
Frontend functionality:
- Browse to frontend URL
- Click "Test API Connection" 
- Navigate to Users page
- Verify data loads from backend

Backend API:
- Browse to backend URL (opens Swagger)
- Test `/api/status` endpoint
- Test `/api/users` endpoint

## Customization

### Adding New Features
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes to frontend/backend code
3. Update tests and documentation
4. Push branch and create pull request
5. Pipeline runs automatically on PR

### Environment Configuration
Update these files for different environments:
- Frontend: `src/environments/environment.prod.ts`
- Backend: `appsettings.Production.json`
- Pipeline: Variables in Azure DevOps

### Scaling and Performance
- Increase App Service plan size for more resources
- Enable auto-scaling rules in Azure portal
- Add Application Insights for monitoring
- Configure CDN for static content

## Support and Troubleshooting

### Common Issues
- **Build failures**: Check pipeline logs and dependency versions
- **Deployment issues**: Verify service connection and resource names
- **CORS errors**: Update backend CORS configuration with production URLs
- **App not starting**: Check App Service logs in Azure portal

### Getting Help
- Review pipeline logs in Azure DevOps
- Check Application Insights for runtime errors
- Consult detailed documentation:
  - `AZURE_SETUP.md` - Complete Azure setup guide
  - `DEVELOPMENT.md` - Local development guide
  - `ARCHITECTURE.md` - Technical architecture details

### Monitoring
- Azure Application Insights for performance monitoring
- Azure Monitor for infrastructure alerts
- Pipeline notifications for build/deployment status

## Next Steps

### Production Readiness
- [ ] Add authentication and authorization
- [ ] Implement database integration
- [ ] Add comprehensive test coverage
- [ ] Configure custom domains and SSL
- [ ] Set up monitoring and alerting
- [ ] Implement proper logging and error handling

### Advanced Features
- [ ] Multi-region deployment
- [ ] A/B testing capabilities
- [ ] Feature flags integration
- [ ] Performance monitoring dashboards
- [ ] Automated security scanning
- [ ] Infrastructure as Code (ARM/Terraform)

---

**🎉 Congratulations!** You now have a complete DevOps CI/CD solution running in Azure. This foundation can be extended and customized for production applications.