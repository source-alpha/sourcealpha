# SourceAlpha

A monorepo containing multiple services deployed on Google Cloud Platform.

## Project Structure

```
sourcealpha/
├── site/              # Website service (Cloud Run)
│   ├── src/          # Application source code
│   ├── Dockerfile    # Container configuration
│   └── package.json  # Dependencies
└── README.md         # This file
```

## Services

### Site
A web application deployed on Google Cloud Run. See [site/README.md](site/README.md) for details.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/) (for local container testing)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (gcloud)
- A Google Cloud Platform account with billing enabled

## GCP Setup

### 1. Install and Configure Google Cloud CLI

```bash
# Install gcloud CLI (if not already installed)
# Visit: https://cloud.google.com/sdk/docs/install

# Authenticate with your Google account
gcloud auth login

# Set your default project
gcloud config set project YOUR_PROJECT_ID
```

### 2. Create a GCP Project

```bash
# Create a new project (or use existing)
gcloud projects create YOUR_PROJECT_ID --name="SourceAlpha"

# Set as default project
gcloud config set project YOUR_PROJECT_ID

# Enable billing for the project (required for Cloud Run)
# Visit: https://console.cloud.google.com/billing
```

### 3. Enable Required APIs

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry API (for storing Docker images)
gcloud services enable containerregistry.googleapis.com

# Enable Artifact Registry API (recommended for newer projects)
gcloud services enable artifactregistry.googleapis.com
```

### 4. Configure Docker for GCP

```bash
# Configure Docker to use gcloud as credential helper
gcloud auth configure-docker
```

### 5. Set Default Region (Optional)

```bash
# Set default region for Cloud Run
gcloud config set run/region us-central1
```

## Local Development

### Running the Site Service Locally

```bash
cd site

# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Or run in production mode
npm start
```

Visit http://localhost:8080 to see the application.

## Deployment to Google Cloud Run

### Deploy the Site Service

```bash
cd site

# Build and deploy to Cloud Run in one command
gcloud run deploy sourcealpha-site \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Alternative: Build Docker image manually and deploy
# 1. Build the image
docker build -t gcr.io/YOUR_PROJECT_ID/sourcealpha-site:latest .

# 2. Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/sourcealpha-site:latest

# 3. Deploy to Cloud Run
gcloud run deploy sourcealpha-site \
  --image gcr.io/YOUR_PROJECT_ID/sourcealpha-site:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Deployment Options

- `--allow-unauthenticated`: Makes the service publicly accessible
- `--region`: Specify the GCP region (e.g., us-central1, europe-west1)
- `--platform managed`: Use fully managed Cloud Run
- `--memory`: Set memory limit (default: 512Mi)
- `--cpu`: Set CPU allocation (default: 1)
- `--max-instances`: Set maximum number of instances (default: 100)
- `--min-instances`: Set minimum number of instances (default: 0)

### Environment Variables

To set environment variables during deployment:

```bash
gcloud run deploy sourcealpha-site \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars "NODE_ENV=production,API_KEY=your-key"
```

## Useful GCP Commands

### View Service Details

```bash
# List all Cloud Run services
gcloud run services list

# Describe a specific service
gcloud run services describe sourcealpha-site --region us-central1

# Get service URL
gcloud run services describe sourcealpha-site --region us-central1 --format='value(status.url)'
```

### View Logs

```bash
# Stream logs from Cloud Run service
gcloud run services logs read sourcealpha-site --region us-central1 --tail

# View logs in Cloud Console
# Visit: https://console.cloud.google.com/run
```

### Update Service

```bash
# Update service with new code
gcloud run deploy sourcealpha-site --source . --region us-central1

# Update environment variables
gcloud run services update sourcealpha-site \
  --region us-central1 \
  --set-env-vars "NEW_VAR=value"

# Update memory/CPU
gcloud run services update sourcealpha-site \
  --region us-central1 \
  --memory 1Gi \
  --cpu 2
```

### Delete Service

```bash
gcloud run services delete sourcealpha-site --region us-central1
```

## Cost Management

Cloud Run pricing is based on:
- Request count
- Compute time (CPU and memory usage)
- Network egress

Free tier includes:
- 2 million requests per month
- 360,000 GB-seconds of memory
- 180,000 vCPU-seconds of compute time

Monitor costs at: https://console.cloud.google.com/billing

## CI/CD Integration

For automated deployments, you can use:

### GitHub Actions Example

Create `.github/workflows/deploy-site.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main
    paths:
      - 'site/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy sourcealpha-site \
            --source ./site \
            --platform managed \
            --region us-central1 \
            --allow-unauthenticated
```

## Security Considerations

1. **Authentication**: Remove `--allow-unauthenticated` flag if you need authentication
2. **Service Accounts**: Use least-privilege service accounts for deployments
3. **Secrets**: Use [Secret Manager](https://cloud.google.com/secret-manager) for sensitive data
4. **HTTPS**: Cloud Run automatically provides HTTPS endpoints
5. **IAM**: Configure proper IAM roles and permissions

## Troubleshooting

### Service Won't Deploy
- Check that billing is enabled on your GCP project
- Verify all required APIs are enabled
- Check Docker image builds successfully locally

### Service Is Slow
- Increase memory allocation with `--memory` flag
- Set `--min-instances 1` to avoid cold starts
- Use Cloud Run CPU boost for faster startup

### Can't Access Service
- Verify `--allow-unauthenticated` flag is set
- Check firewall rules
- Verify service deployed successfully with `gcloud run services list`

## Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [Best Practices for Cloud Run](https://cloud.google.com/run/docs/tips)
- [GCP Free Tier](https://cloud.google.com/free)

## License

[Your License Here]
