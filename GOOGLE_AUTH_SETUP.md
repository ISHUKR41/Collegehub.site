# Google Authentication Setup Guide

## Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **collegehub-dace9**
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth Client ID**
5. Choose **Web Application**
6. Add these **Authorized redirect URIs**:
   - `http://localhost:5000/api/auth/google/callback` (for development)
   - `https://your-production-domain.com/api/auth/google/callback` (for production)
7. Add these **Authorized JavaScript origins**:
   - `http://localhost:3000` (for development)
   - `https://your-production-domain.com` (for production)
8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

## Step 2: Update Backend .env File

Open `backend/.env` and replace:
```
GOOGLE_CLIENT_ID=638964165477-<YOUR_CLIENT_ID_HERE>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<YOUR_CLIENT_SECRET_HERE>
```

With your actual credentials:
```
GOOGLE_CLIENT_ID=638964165477-abc123xyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_actual_secret_here
```

## Step 3: Restart Backend Server

After updating the .env file, restart your backend server:
```bash
cd backend
npm run dev
```

## Step 4: Test Google Login

1. Open your app: http://localhost:3000
2. Go to Login page
3. Click "Continue with Google"
4. You should be redirected to Google sign-in
5. After successful login, you'll be redirected back to the app

## Troubleshooting

### Error: "Google sign-in failed"
- Check that your Client ID and Secret are correct
- Make sure the redirect URI in Google Console matches exactly
- Check backend logs for detailed error messages

### Error: "redirect_uri_mismatch"
- The redirect URI in your request doesn't match the one in Google Console
- Add `http://localhost:5000/api/auth/google/callback` to Authorized redirect URIs

### Backend not connecting to Google
- Make sure backend/.env file has correct credentials
- Restart the backend server after changing .env
- Check backend logs: `cd backend && npm run dev`
