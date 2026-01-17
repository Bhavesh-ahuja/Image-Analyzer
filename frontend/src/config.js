const config = {
    development: {
        API_BASE_URL: 'http://localhost:8000/api'
    },
    production: {
        // This is your deployed Render backend URL
        API_BASE_URL: 'https://image-analyzer-ssej.onrender.com/api'
    }
};

// Determine environment
// Vite sets import.meta.env.MODE to 'production' during build
const environment = import.meta.env.MODE === 'production' ? 'production' : 'development';

export const API_URL = config[environment].API_BASE_URL;

console.log(`[Config] Environment: ${environment}, API URL: ${API_URL}`);
