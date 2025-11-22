// API Configuration
// This file centralizes API endpoint configuration for easy deployment

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// For production, set this to your deployed backend URL
// Example: 'https://vidhi-ai-server.onrender.com'
const PRODUCTION_API_URL = import.meta.env.VITE_API_URL || '';

// For local development
const DEVELOPMENT_API_URL = 'http://127.0.0.1:3000';

// Export the appropriate API URL based on environment
export const API_BASE_URL = isProduction && PRODUCTION_API_URL
    ? PRODUCTION_API_URL
    : DEVELOPMENT_API_URL;

// Helper function to build full API endpoint
export const getApiUrl = (endpoint: string): string => {
    // Ensure endpoint starts with /
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_BASE_URL}${normalizedEndpoint}`;
};

// Log current configuration (only in development)
if (isDevelopment) {
    console.log('🔧 API Configuration:', {
        environment: isDevelopment ? 'Development' : 'Production',
        apiBaseUrl: API_BASE_URL
    });
}
