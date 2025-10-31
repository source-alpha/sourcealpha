# SourceAlpha Site

The main website service for SourceAlpha, deployed on Google Cloud Run.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Container**: Docker
- **Platform**: Google Cloud Run

## Directory Structure

```
site/
├── src/
│   └── index.js       # Main application entry point
├── Dockerfile         # Container configuration
├── .dockerignore      # Docker build exclusions
├── package.json       # Node.js dependencies
└── README.md         # This file
```

## Local Development

### Prerequisites

- Node.js 18 or later
- npm (comes with Node.js)

### Setup

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

The server will start on http://localhost:8080

### Environment Variables

- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment mode (development/production)

Create a `.env` file in the site directory for local environment variables:

```env
PORT=8080
NODE_ENV=development
```

## API Endpoints

### GET /
Returns the main HTML page with a hello world message.

### GET /health
Health check endpoint for Cloud Run.

**Response:**
```json
{
  "status": "healthy"
}
```

## Docker

### Build Image Locally

```bash
docker build -t sourcealpha-site .
```

### Run Container Locally

```bash
docker run -p 8080:8080 sourcealpha-site
```

### Test Container

```bash
curl http://localhost:8080
curl http://localhost:8080/health
```

## Deployment

### Quick Deploy

From the `site` directory:

```bash
gcloud run deploy sourcealpha-site \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Manual Deploy with Docker

```bash
# 1. Set your GCP project ID
PROJECT_ID="your-project-id"

# 2. Build the image
docker build -t gcr.io/${PROJECT_ID}/sourcealpha-site:latest .

# 3. Push to Google Container Registry
docker push gcr.io/${PROJECT_ID}/sourcealpha-site:latest

# 4. Deploy to Cloud Run
gcloud run deploy sourcealpha-site \
  --image gcr.io/${PROJECT_ID}/sourcealpha-site:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Deployment with Custom Configuration

```bash
gcloud run deploy sourcealpha-site \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --set-env-vars "NODE_ENV=production"
```

## Performance Considerations

### Cold Starts
Cloud Run may experience cold starts when scaling from zero. To minimize:
- Keep the Docker image small
- Use `--min-instances 1` for production
- Optimize application startup time

### Memory and CPU
Default allocation:
- Memory: 512Mi
- CPU: 1

Adjust based on load:
```bash
gcloud run services update sourcealpha-site \
  --memory 1Gi \
  --cpu 2
```

## Monitoring

### View Logs

```bash
# Stream logs
gcloud run services logs read sourcealpha-site --region us-central1 --tail

# View in Cloud Console
https://console.cloud.google.com/run/detail/REGION/sourcealpha-site/logs
```

### Metrics

View metrics in Cloud Console:
- Request count
- Request latency
- Container instance count
- Memory and CPU usage

https://console.cloud.google.com/run/detail/REGION/sourcealpha-site/metrics

## Development Workflow

1. Make changes to code in `src/`
2. Test locally with `npm run dev`
3. Test Docker build: `docker build -t sourcealpha-site .`
4. Deploy to Cloud Run
5. Verify deployment at the provided URL

## Adding New Features

### New Endpoint

Add a new route in `src/index.js`:

```javascript
app.get('/api/new-endpoint', (req, res) => {
  res.json({ message: 'Hello from new endpoint' });
});
```

### Static Files

To serve static files, add Express static middleware:

```javascript
app.use(express.static('public'));
```

### Environment Variables

Access environment variables in code:

```javascript
const apiKey = process.env.API_KEY;
```

Set during deployment:

```bash
gcloud run deploy sourcealpha-site \
  --source . \
  --set-env-vars "API_KEY=your-key"
```

## Troubleshooting

### Port Issues
Cloud Run sets the `PORT` environment variable. Always use:
```javascript
const PORT = process.env.PORT || 8080;
```

### Build Failures
- Check Dockerfile syntax
- Verify all files are copied correctly
- Test Docker build locally first

### Service Won't Start
- Check logs: `gcloud run services logs read sourcealpha-site`
- Verify health endpoint returns 200 OK
- Ensure app listens on the correct port

## Future Enhancements

Potential improvements for this service:
- [ ] Add database integration (Cloud SQL, Firestore)
- [ ] Implement authentication (Firebase Auth, Identity Platform)
- [ ] Add API endpoints
- [ ] Set up monitoring and alerting
- [ ] Configure custom domain
- [ ] Add CDN for static assets
- [ ] Implement rate limiting
- [ ] Add comprehensive logging

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
