declare module '@env' {
  // Firebase Configuration
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_STORAGE_BUCKET: string;
  export const FIREBASE_MESSAGING_SENDER_ID: string;
  export const FIREBASE_APP_ID: string;

  // Google Maps API Key
  export const GOOGLE_MAPS_API_KEY: string;

  // Other Environment Variables
  export const ENV: 'development' | 'production' | 'test';
  export const API_URL: string;
}

// Add type declarations for other environment variables as needed
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
} 
