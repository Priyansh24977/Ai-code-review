require('dotenv').config();
const app = require('./src/app');

// Startup environment validation
if (!process.env.GOOGLE_GEMINI_KEY) {
  console.warn('⚠️ WARNING: GOOGLE_GEMINI_KEY is not defined in environment variables!');
  console.warn('Please add GOOGLE_GEMINI_KEY to your .env file or environment configuration.');
}

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 AI Code Reviewer Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

// Graceful Shutdown
const shutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force exit after 10 seconds if connections hang
  setTimeout(() => {
    console.error('Forcing shutdown due to timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));