# DentalCare Pro - Full Stack Dental Clinic Management Software

A comprehensive dental clinic management system built with React.js frontend and Node.js/Express backend with SQLite database.

## Features

### 🏥 Core Functionality
- **Patient Management**: Complete patient profiles, medical history, contact information
- **Appointment Scheduling**: Calendar-based scheduling with conflict detection
- **Treatment Planning**: Comprehensive treatment records and procedure tracking
- **Billing & Invoicing**: Automated billing, payment tracking, insurance handling
- **Staff Management**: Role-based access control for different staff types
- **Reports & Analytics**: Dashboard with key metrics and detailed reports

### 👥 User Roles
- **Admin**: Full system access, staff management, reports
- **Dentist**: Patient care, treatments, appointments, reports
- **Hygienist**: Patient care, basic treatments, appointments
- **Receptionist**: Patient registration, appointment scheduling, billing
- **Assistant**: Limited access to patient information and appointments

### 🔐 Security Features
- JWT-based authentication
- Role-based authorization
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: helmet, cors, bcryptjs

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Query + Context API
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Forms**: React Hook Form
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## Project Structure

```
dental-clinic-software/
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── database/         # SQLite database file
│   └── index.js          # Server entry point
├── client/               # Frontend React app
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.js        # Main app component
└── package.json          # Root package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dental-clinic-software
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

### 3. Environment Configuration
```bash
# Copy environment file in server directory
cd server
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

### 4. Database Setup
The application uses SQLite, so no additional database setup is required. The database file will be created automatically when you start the server.

### 5. Create Initial Admin User
After starting the server, you can create an admin user by making a POST request to `/api/auth/register` or use the demo credentials provided in the login page.

## Running the Application

### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev

# Or run them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

### Production Mode
```bash
# Build frontend
npm run build

# Start server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: admin@dentalcare.com
- **Password**: admin123

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Patient Endpoints
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Deactivate patient
- `GET /api/patients/stats` - Get patient statistics

### Appointment Endpoints
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Treatment Endpoints
- `GET /api/treatments` - Get all treatments
- `GET /api/treatments/:id` - Get treatment by ID
- `POST /api/treatments` - Create new treatment
- `PUT /api/treatments/:id` - Update treatment
- `DELETE /api/treatments/:id` - Delete treatment

### Billing Endpoints
- `GET /api/billing` - Get all invoices
- `GET /api/billing/:id` - Get invoice by ID
- `POST /api/billing` - Create new invoice
- `PUT /api/billing/:id` - Update invoice
- `DELETE /api/billing/:id` - Delete invoice

### Staff Endpoints
- `GET /api/staff` - Get all staff members
- `GET /api/staff/:id` - Get staff member by ID
- `POST /api/staff` - Create new staff member
- `PUT /api/staff/:id` - Update staff member
- `DELETE /api/staff/:id` - Delete staff member

### Reports Endpoints
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/patients` - Get patient reports
- `GET /api/reports/revenue` - Get revenue reports
- `GET /api/reports/appointments` - Get appointment reports

## Database Schema

### Users Table
- User authentication and staff information
- Roles: admin, dentist, hygienist, receptionist, assistant

### Patients Table
- Complete patient information
- Medical history and contact details
- Insurance information

### Appointments Table
- Appointment scheduling and management
- Status tracking and reminders

### Treatments Table
- Treatment records and procedures
- Cost tracking and follow-up requirements

### Invoices Table
- Billing and payment tracking
- Insurance claims and patient portions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
