# Azure DevOps Setup Guide

## Prerequisites

### Azure Resources
1. **Azure Subscription** with appropriate permissions to create resources
2. **Resource Group** for organizing the resources
3. **Azure App Services** (2 instances):
   - One for the backend (.NET Core)
   - One for the frontend (Node.js)

### Azure DevOps
1. **Azure DevOps Organization** and Project
2. **Service Connection** to Azure subscription
3. **Agent Pools** (use Microsoft-hosted agents or self-hosted)

## Step-by-Step Setup

### 1. Create Azure Resources

#### Using Azure CLI:
```bash
# Login to Azure
az login

# Create resource group
az group create --name devops-test-rg --location "East US"

# Create App Service Plan
az appservice plan create --name devops-test-plan --resource-group devops-test-rg --sku B1 --is-linux

# Create Backend App Service (.NET Core)
az webapp create --name devops-backend-app --resource-group devops-test-rg --plan devops-test-plan --runtime "DOTNETCORE|2.2"

# Create Frontend App Service (Node.js)
az webapp create --name devops-frontend-app --resource-group devops-test-rg --plan devops-test-plan --runtime "NODE|16-lts"

# Create staging slots
az webapp deployment slot create --name devops-backend-app --resource-group devops-test-rg --slot staging
az webapp deployment slot create --name devops-frontend-app --resource-group devops-test-rg --slot staging
```

#### Using Azure Portal:
1. Navigate to Azure Portal (portal.azure.com)
2. Create a new Resource Group named `devops-test-rg`
3. Create App Service Plan with Basic B1 tier
4. Create two Web Apps:
   - Backend: Runtime stack .NET Core 2.2
   - Frontend: Runtime stack Node.js 16 LTS
5. Add staging deployment slots to both apps

### 2. Configure Azure DevOps

#### Create Service Connection:
1. Go to Project Settings → Service connections
2. Create new service connection → Azure Resource Manager
3. Choose Service principal (automatic) or Service principal (manual)
4. Select your subscription and resource group
5. Name it `your-azure-service-connection`

#### Import Repository:
1. Go to Repos → Import repository
2. Add your Git repository URL
3. Or initialize a new repository and push the code

### 3. Create Build Pipeline

1. Go to Pipelines → Create Pipeline
2. Choose your repository
3. Select "Existing Azure Pipelines YAML file"
4. Choose `/azure-pipelines-build.yml`
5. Save and run the pipeline

#### Required Variables:
Set these in Pipeline → Edit → Variables:
- `buildConfiguration`: Release
- `dotNetVersion`: 2.2.x
- `nodeVersion`: 16.x

### 4. Create Release Pipeline

1. Go to Pipelines → Releases → New pipeline
2. Start with Empty job
3. Add artifacts from your build pipeline
4. Create stages for Staging and Production
5. Or use the YAML release pipeline:
   - Create new pipeline
   - Choose "Existing Azure Pipelines YAML file"
   - Select `/azure-pipelines-release.yml`

#### Required Variables:
Set these in Pipeline variables:
- `azureSubscription`: your-azure-service-connection
- `backendAppService`: devops-backend-app
- `frontendAppService`: devops-frontend-app
- `resourceGroupName`: devops-test-rg

### 5. Configure Environments

1. Go to Pipelines → Environments
2. Create environments:
   - `staging` - for staging deployments
   - `production` - for production deployments
3. Add approval gates for production environment:
   - Go to production environment
   - Add approvers for deployment approval

### 6. Configure App Service Settings

#### Backend App Service Configuration:
```json
{
  "ASPNETCORE_ENVIRONMENT": "Production",
  "WEBSITE_RUN_FROM_PACKAGE": "1"
}
```

#### Frontend App Service Configuration:
```json
{
  "NODE_ENV": "production",
  "WEBSITE_NODE_DEFAULT_VERSION": "16.14.0",
  "API_URL": "https://devops-backend-app.azurewebsites.net"
}
```

## Pipeline Features

### Build Pipeline Features:
- **Multi-stage pipeline** with separate jobs for frontend and backend
- **Dependency caching** for faster builds
- **Code quality checks** with linting and testing
- **Security scanning** with SonarCloud integration
- **Artifact publishing** for deployment

### Release Pipeline Features:
- **Blue-green deployment** with staging slots
- **Automated testing** after each deployment
- **Production approval gates** for controlled releases
- **Rollback capability** if deployment fails
- **Environment-specific configurations**

## Monitoring and Logging

### Azure Application Insights:
1. Create Application Insights resource
2. Configure both apps to use Application Insights
3. Add instrumentation keys to app settings

### Azure Monitor:
1. Set up alerts for application health
2. Configure metric alerts for performance monitoring
3. Create dashboards for operational visibility

## Security Considerations

### App Service Security:
- Enable HTTPS only
- Configure authentication if needed
- Set up custom domains and SSL certificates
- Enable diagnostic logging

### Pipeline Security:
- Use service connections instead of storing credentials
- Enable approval gates for production deployments
- Implement branch policies and pull request validation
- Use Azure Key Vault for sensitive configuration

## Troubleshooting

### Common Build Issues:
1. **Node.js version mismatch**: Ensure pipeline uses same version as local development
2. **Package restore failures**: Check npm cache and package-lock.json
3. **dotnet build failures**: Verify .NET Core SDK version and NuGet sources

### Common Deployment Issues:
1. **App Service not starting**: Check application logs and startup settings
2. **CORS errors**: Verify CORS configuration includes production URLs
3. **Environment variables**: Ensure all required settings are configured in App Service

### Getting Help:
- Check Azure DevOps pipeline logs
- Review App Service diagnostic logs
- Monitor Application Insights for runtime errors
- Use Azure Support for infrastructure issues