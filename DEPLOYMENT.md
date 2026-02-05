# Deployment

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration (Frontend)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Create a `.env` file in the `server/` directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret

# Server Port
PORT=5001
```

## Vercel Deployment

See [Vercel Deployment Guide](docs/vercel_deployment_guide.md) for detailed deployment instructions.

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables
5. Deploy!

## Files to Keep Secret

The following files contain sensitive information and should NEVER be committed:

- `.env.local` (Firebase keys)
- `server/.env` (MongoDB URI, JWT secret)
- `server/serviceAccountKey.json` (Firebase Admin credentials)

These are already in `.gitignore` for your protection.
