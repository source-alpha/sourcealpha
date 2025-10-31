# SourceAlpha Site

An Astro.js website deployed on Google Cloud Run with server-side rendering.

## Tech Stack

- **Framework**: Astro 4.16+ with Node.js adapter
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 18+
- **Platform**: Google Cloud Run

## Local Development

### Prerequisites

- Node.js 18 or later
- npm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs on http://localhost:8080

## Project Structure

```
site/
├── src/
│   ├── components/    # Reusable Astro components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Routes (file-based routing)
│   └── styles/        # Global styles
├── public/            # Static assets
├── astro.config.mjs   # Astro configuration
├── tailwind.config.mjs
├── Dockerfile
└── package.json
```

## Docker

### Build and Run Locally

```bash
# Build image
docker build -t sourcealpha-site .

# Run container
docker run -p 8080:8080 sourcealpha-site

# Test
curl http://localhost:8080
```

## Deployment to Cloud Run

### Quick Deploy

From the `site` directory:

```bash
gcloud run deploy sourcealpha-site \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Deploy with Configuration

```bash
gcloud run deploy sourcealpha-site \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

## Environment Variables

The application uses:
- `PORT`: Server port (Cloud Run sets this automatically, default: 8080)
- `HOST`: Server host (set to `0.0.0.0` in Dockerfile for Cloud Run)

## View Logs

```bash
# Stream logs
gcloud run services logs read sourcealpha-site --region us-central1 --tail
```

## Resources

- [Astro Documentation](https://docs.astro.build/)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
