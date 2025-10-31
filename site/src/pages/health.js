// Health check endpoint for Google Cloud Run
export async function GET() {
  return new Response(
    JSON.stringify({ status: 'healthy' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
