# FaceForward API Integration - Frontend Implementation

## Overview
The login and signup functionality now integrates with external APIs and displays toast notifications for user feedback.

## What's Been Done

### 1. **Toast Notifications Added**
   - Installed `react-toastify` package
   - Added `ToastContainer` in [App.js](App.js)
   - Now shows success/error messages to users

### 2. **API Service Created**
   - New file: [src/services/authApi.js](src/services/authApi.js)
   - Handles all authentication API calls
   - Includes request interceptor for automatic token management
   - Two main functions:
     - `loginUser(email, password)` - Login API call
     - `registerUser(name, email, password)` - Registration API call

### 3. **Login Component Updated**
   - [src/components/Login.js](src/components/Login.js)
   - Changed from simulated API to real API calls
   - Displays toast notifications for:
     - ✅ Successful login
     - ❌ Failed login with error message
     - ❌ Validation errors

### 4. **Signup Component Updated**
   - [src/components/Signup.js](src/components/Signup.js)
   - Changed from simulated API to real API calls
   - Displays toast notifications for:
     - ✅ Successful registration
     - ❌ Failed registration with error message
     - ❌ Validation errors (password mismatch, too short, etc.)

## Configuration

### Step 1: Create `.env` file
Copy `.env.example` and create a `.env` file in the project root:

```bash
cp .env.example .env
```

### Step 2: Set Your API Endpoint
Edit `.env` and add your API endpoint:

```env
REACT_APP_API_URL=http://your-api-domain.com/api
```

## Expected Backend API Endpoints

Your backend should have these two endpoints:

### 1. Login Endpoint
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "jwt-token-here"
}
```

**Error Response (400/401):**
```json
{
  "message": "Invalid email or password"
}
```

### 2. Register Endpoint
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200/201):**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "jwt-token-here"
}
```

**Error Response (400/409):**
```json
{
  "message": "Email already registered"
}
```

## How It Works

### Flow Diagram
```
User fills form → Frontend validation → API call → API response → 
Toast notification (success/error) → Redux state update → UI update
```

### Error Handling
1. **Client-side validation** - Empty fields, password mismatch, etc.
2. **API response** - Backend error messages displayed to user
3. **Network errors** - Fallback error message shown

### Token Management
- Token is automatically added to all API requests
- Token is stored in localStorage
- Token can be used for authenticated API calls

## Testing Your Integration

1. **Start your backend API server** (ensure it's running on the configured URL)
2. **Start the React app:**
   ```bash
   npm start
   ```
3. **Test the flows:**
   - Try logging in with invalid credentials → should show error toast
   - Try registering with existing email → should show error toast
   - Try successful login/signup → should show success toast and redirect

## Toast Notification Features

The toasts are configured with:
- **Position:** Top-right corner
- **Auto-close:** 4 seconds
- **Pausable:** On hover or focus loss
- **Draggable:** Users can drag to dismiss
- **Theme:** Light theme matching your design

## File Structure

```
src/
├── services/
│   └── authApi.js          ← API calls and axios setup
├── components/
│   ├── Login.js            ← Updated with API integration
│   └── Signup.js           ← Updated with API integration
├── redux/
│   └── authSlice.js        ← State management
├── App.js                  ← ToastContainer added
└── App.css
```

## Important Notes

⚠️ **Do not commit to GitHub yet** - Pending your review

✅ **Local development:** Make sure your `.env` file is NOT committed to git. Add it to `.gitignore`

## Next Steps

1. Set up your backend API endpoints
2. Configure the `.env` file with your API URL
3. Test the login/signup flows
4. Verify error messages from backend are displayed correctly
5. Once everything works, it will be ready for GitHub commit
