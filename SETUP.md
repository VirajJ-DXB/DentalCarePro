# DentalCare Pro - Setup Guide

This guide will help you set up and run the DentalCare Pro dental clinic management software on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)

## Quick Start

### 1. Download/Clone the Project
```bash
# If you have the project files, navigate to the directory
cd dental-clinic-software

# Or if cloning from a repository:
# git clone <repository-url>
# cd dental-clinic-software
```

### 2. Install All Dependencies
```bash
# Install root dependencies (for running both frontend and backend together)
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Set Up Environment Variables
```bash
# Navigate to server directory
cd server

# Copy the example environment file
copy .env.example .env
# On Mac/Linux: cp .env.example .env
```

Edit the `.env` file with your preferred settings:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLINIC_NAME=Your Dental Clinic
CLINIC_ADDRESS=123 Main St, City, State 12345
CLINIC_PHONE=(555) 123-4567
CLINIC_EMAIL=info@yourdentalclinic.com
```

### 4. Initialize the Database
```bash
# From the server directory, run the database seeder
npm run seed
```

This will create the SQLite database and populate it with sample data including demo users.

### 5. Start the Application
```bash
# Go back to the root directory
cd ..

# Start both frontend and backend
npm run dev
```

The application will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Demo Login Credentials

After seeding the database, you can log in with these demo accounts:

### Admin Account
- **Email**: admin@dentalcare.com
- **Password**: admin123
- **Access**: Full system access

### Dentist Account
- **Email**: sarah.johnson@dentalcare.com
- **Password**: dentist123
- **Access**: Patient care, treatments, appointments, reports

### Receptionist Account
- **Email**: emily.davis@dentalcare.com
- **Password**: receptionist123
- **Access**: Patient registration, appointments, billing

## Alternative Setup Methods

### Running Frontend and Backend Separately

If you prefer to run the frontend and backend separately:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### Production Build

To create a production build:

```bash
# Build the frontend
cd client
npm run build

# Start the backend in production mode
cd ../server
NODE_ENV=production npm start
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - If port 3000 or 5000 is already in use, you can change them:
   - Frontend: Set `PORT=3001` in client/.env
   - Backend: Change `PORT=5001` in server/.env

2. **Database Issues**
   - Delete the `server/database/dental_clinic.db` file and run `npm run seed` again

3. **Module Not Found Errors**
   - Make sure you've installed dependencies in both client and server directories
   - Try deleting `node_modules` folders and running `npm install` again

4. **CORS Errors**
   - Ensure the backend is running on port 5000
   - Check that the proxy setting in client/package.json points to the correct backend URL

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Ensure all dependencies are installed correctly
3. Verify that both frontend and backend are running
4. Check that the database was created successfully

## Next Steps

Once the application is running:

1. **Log in** using one of the demo accounts
2. **Explore the dashboard** to see the overview
3. **Add new patients** through the Patients section
4. **Schedule appointments** in the Appointments section
5. **Create treatments** and track patient care
6. **Generate invoices** for billing

## Development

### Project Structure
```
dental-clinic-software/
├── server/           # Backend (Node.js/Express)
├── client/           # Frontend (React)
├── package.json      # Root package.json for running both
└── README.md         # Detailed documentation
```

### Available Scripts

From the root directory:
- `npm run dev` - Run both frontend and backend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run build` - Build frontend for production

From the server directory:
- `npm run dev` - Run backend with nodemon
- `npm run seed` - Seed database with sample data
- `npm test` - Run backend tests

From the client directory:
- `npm start` - Run frontend development server
- `npm run build` - Build frontend for production
- `npm test` - Run frontend tests

## Features Overview

The application includes:
- **Patient Management**: Complete patient profiles and medical history
- **Appointment Scheduling**: Calendar-based appointment system
- **Treatment Tracking**: Comprehensive treatment records
- **Billing System**: Invoice generation and payment tracking
- **Staff Management**: Role-based access control
- **Reports & Analytics**: Dashboard with key metrics

Enjoy using DentalCare Pro!
