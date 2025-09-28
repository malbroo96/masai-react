# Loan Application System

A modern loan application system built with React, TypeScript, and Firebase. The application features secure authentication, multi-step loan applications, status tracking, and payment management.

## Key Features

- User authentication with Firebase
- Multi-step loan application process
- Real-time application status tracking
- Interactive repayment calendar
- Document upload and verification

## Component Structure

### Authentication Components

#### `AuthForm.tsx`

- Handles user login and registration
- Email/password authentication with Firebase
- Role-based access (admin/user)
- Form validation with error handling

### Core Components

#### `LoanForm.tsx`

- Multi-step loan application form with 4 stages:
  1. Personal Information
  2. Financial Details
  3. Document Upload
  4. Application Review
- Real-time validation
- Progress tracking
- Document upload functionality

#### `LoanDashboard.tsx`

- Main dashboard for loan management
- Displays loan applications and their statuses
- Visual progress indicators
- Document verification status
- Integration with RepaymentCalendar

#### `RepaymentCalendar.tsx`

- Interactive calendar for payment tracking
- Color-coded payment status indicators
- Payment recording functionality
- Monthly view with payment summaries

## State Management

### Redux Slices

#### `authSlice.ts`

- Manages authentication state
- User information and role management
- Login/logout functionality

#### `loanSlice.ts`

- Handles loan application data
- Application status management
- Document tracking
- Multi-step form state

#### `paymentSlice.ts`

- Manages payment schedules
- Payment status tracking
- Payment history
- Due date management

## Authentication Flow

1. Users can sign up/login via email and password
2. Special role assignment for admin@site.com
3. Protected routes ensure authenticated access
4. Firebase handles authentication state persistence

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase configuration in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React with TypeScript
- Firebase Authentication
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation
  import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
