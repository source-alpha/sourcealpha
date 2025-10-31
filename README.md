# SourceAlpha

AI-powered deal sourcing platform for venture capital and private equity firms.

**Live Site**: https://sourcealpha-site-443233981373.us-central1.run.app

## Project Structure

```
sourcealpha/
├── site/              # Astro website service (Cloud Run)
│   ├── src/
│   │   ├── components/    # Astro components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Routes and pages
│   │   └── styles/        # Global styles
│   ├── Dockerfile         # Container configuration
│   └── package.json       # Dependencies
└── README.md             # This file
```

## Technology Stack

- **Framework**: [Astro](https://astro.build/) with SSR
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Runtime**: Node.js 18
- **Deployment**: Google Cloud Run
- **Container**: Docker

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Docker](https://www.docker.com/) (for local container testing)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (for deployment)

## Local Development

```bash
cd site

# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start
```

Visit http://localhost:4321 (dev) or http://localhost:8080 (production) to view the site.

## Deployment

The site is automatically deployed to Google Cloud Run. To deploy updates:

```bash
cd site

# Build Docker image for linux/amd64 platform
docker build --platform=linux/amd64 -t gcr.io/sourcealpha/sourcealpha-site:latest .

# Push to Google Container Registry
docker push gcr.io/sourcealpha/sourcealpha-site:latest

# Deploy to Cloud Run
gcloud run deploy sourcealpha-site \
  --image=gcr.io/sourcealpha/sourcealpha-site:latest \
  --region=us-central1 \
  --platform=managed \
  --port=8080
```

## Useful Commands

```bash
# View logs
gcloud run services logs read sourcealpha-site --region us-central1 --tail

# View service details
gcloud run services describe sourcealpha-site --region us-central1

# Update environment variables
gcloud run services update sourcealpha-site \
  --region=us-central1 \
  --set-env-vars "KEY=value"
```

## Development

### Tech Stack
- **Frontend**: Astro 4.16 with server-side rendering
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Inline SVG for optimal performance
- **Components**: Modular Astro components (Header, Hero, Features, CTA, Footer)

### Key Features
- Responsive design with mobile-first approach
- Server-side rendered for optimal SEO
- Health check endpoint at `/health` for Cloud Run
- Custom green accent theme (`#00ff80`)
- Optimized Docker build with multi-stage caching

## Project Links

- **Repository**: https://github.com/source-alpha/sourcealpha
- **Live Site**: https://sourcealpha-site-443233981373.us-central1.run.app
- **Cloud Console**: https://console.cloud.google.com/run
