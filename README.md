# MedCast Backend - Healthcare CMS & API

A comprehensive backend system for managing healthcare content including hospitals, doctors, treatments, specialties, and patient testimonials. Built with Express.js, TypeScript, MySQL, and Sequelize ORM.

## 🌟 Features

### Core Features

- **Hospital Management**: Complete CRUD operations for hospital profiles
- **Doctor Management**: Manage doctor profiles with specializations and expertise
- **Treatment Management**: Create and manage medical treatments and procedures
- **Specialty Management**: Organize medical specialties and services
- **Testimonial System**: Patient reviews with approval workflow
- **File Upload**: Image upload for hospitals, doctors, and testimonials
- **Authentication**: JWT-based authentication with role-based access control
- **Role-Based Permissions**: Admin, Hospital Manager, and Doctor roles

### Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection (via Sequelize ORM)

## 🏗️ Architecture

### Database Schema

```
Users
├── id (PK)
├── email (unique)
├── password (hashed)
├── name
├── role (admin, hospital_manager, doctor)
├── hospitalId (FK)
└── isActive

Hospitals
├── id (PK)
├── name
├── slug (unique)
├── location
├── city, state, country
├── rating
├── specialty
├── description
├── image
├── accreditation
└── contact info

Specialties
├── id (PK)
├── name (unique)
├── slug (unique)
├── description
├── icon
└── styling info

Doctors
├── id (PK)
├── hospitalId (FK)
├── specialtyId (FK)
├── name
├── slug (unique)
├── specialization
├── experience
├── rating
├── image
├── qualifications
├── expertise (JSON)
└── contact info

Treatments
├── id (PK)
├── hospitalId (FK)
├── specialtyId (FK)
├── name
├── cost
├── description
├── duration
└── stay

Testimonials
├── id (PK)
├── hospitalId (FK)
├── doctorId (FK)
├── patientName
├── treatment
├── rating
├── story
├── isApproved
└── isActive
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up MySQL database**

```sql
CREATE DATABASE medcast_db;
```

4. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=medcast_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173

ADMIN_EMAIL=admin@medcast.com
ADMIN_PASSWORD=Admin@123
```

5. **Run the application**

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "hospital_manager",
  "hospitalId": 1
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

#### Get Profile

```http
GET /api/auth/profile
Authorization: Bearer {token}
```

### Hospital Endpoints

#### Get All Hospitals

```http
GET /api/hospitals?page=1&limit=10&search=apollo&city=Delhi&isActive=true
```

#### Get Hospital by ID

```http
GET /api/hospitals/1
```

#### Get Hospital by Slug

```http
GET /api/hospitals/slug/apollo-hospital
```

#### Create Hospital (Admin only)

```http
POST /api/hospitals
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

{
  "name": "Apollo Hospital",
  "location": "New Delhi",
  "city": "New Delhi",
  "state": "Delhi",
  "rating": 4.8,
  "specialty": "Multi-specialty hospital",
  "accreditation": "JCI Accredited",
  "image": [file upload]
}
```

#### Update Hospital (Admin only)

```http
PUT /api/hospitals/1
Authorization: Bearer {admin_token}
```

#### Delete Hospital (Admin only)

```http
DELETE /api/hospitals/1
Authorization: Bearer {admin_token}
```

### Doctor Endpoints

#### Get All Doctors

```http
GET /api/doctors?page=1&limit=10&hospitalId=1&specialtyId=2
```

#### Create Doctor (Admin/Hospital Manager)

```http
POST /api/doctors
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "hospitalId": 1,
  "specialtyId": 2,
  "name": "Dr. John Smith",
  "specialization": "Cardiologist",
  "experience": "15+ years",
  "rating": 4.9,
  "qualifications": "MBBS, MD, DM Cardiology",
  "expertise": ["Heart Surgery", "Angioplasty"],
  "image": [file upload]
}
```

### Treatment Endpoints

#### Get All Treatments

```http
GET /api/treatments?hospitalId=1&specialtyId=2
```

#### Create Treatment (Admin/Hospital Manager)

```http
POST /api/treatments
Authorization: Bearer {token}
Content-Type: application/json

{
  "hospitalId": 1,
  "specialtyId": 2,
  "name": "Heart Bypass Surgery",
  "cost": "$5,000 - $7,000",
  "description": "CABG procedure",
  "duration": "4-6 hours",
  "stay": "7-10 days"
}
```

### Specialty Endpoints

#### Get All Specialties

```http
GET /api/specialties
```

#### Create Specialty (Admin only)

```http
POST /api/specialties
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

{
  "name": "Cardiology",
  "description": "Heart care specialty",
  "icon": "Heart",
  "bgColor": "bg-red-50",
  "image": [file upload]
}
```

### Testimonial Endpoints

#### Get All Testimonials

```http
GET /api/testimonials?hospitalId=1&isApproved=true
```

#### Create Testimonial

```http
POST /api/testimonials
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "hospitalId": 1,
  "doctorId": 5,
  "patientName": "Jane Doe",
  "age": 45,
  "country": "USA",
  "treatment": "Heart Surgery",
  "rating": 5,
  "story": "Excellent care and treatment",
  "image": [file upload]
}
```

#### Approve Testimonial (Admin only)

```http
PATCH /api/testimonials/1/approve
Authorization: Bearer {admin_token}
```

## 🔐 Authentication & Authorization

### Roles

1. **Admin**: Full access to all resources
2. **Hospital Manager**: Manage doctors, treatments, and testimonials for their hospital
3. **Doctor**: Limited access (can be extended)

### Protected Routes

All routes except public GET endpoints require authentication. Use the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.ts              # Configuration management
│   │   └── database.ts           # Database connection
│   ├── models/
│   │   ├── User.ts
│   │   ├── Hospital.ts
│   │   ├── Specialty.ts
│   │   ├── Doctor.ts
│   │   ├── Treatment.ts
│   │   ├── Testimonial.ts
│   │   └── index.ts              # Model relationships
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── hospitalController.ts
│   │   ├── doctorController.ts
│   │   ├── treatmentController.ts
│   │   ├── specialtyController.ts
│   │   └── testimonialController.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── hospitalRoutes.ts
│   │   ├── doctorRoutes.ts
│   │   ├── treatmentRoutes.ts
│   │   ├── specialtyRoutes.ts
│   │   ├── testimonialRoutes.ts
│   │   └── index.ts
│   ├── middleware/
│   │   ├── auth.ts               # Authentication & authorization
│   │   ├── error.ts              # Error handling
│   │   └── upload.ts             # File upload handling
│   ├── utils/
│   │   ├── auth.ts               # Auth utilities
│   │   ├── slug.ts               # Slug generation
│   │   └── initDb.ts             # Database initialization
│   └── server.ts                 # Application entry point
├── uploads/                      # Uploaded files directory
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

### Adding New Features

1. Create model in `src/models/`
2. Create controller in `src/controllers/`
3. Create routes in `src/routes/`
4. Add route to `src/routes/index.ts`
5. Update model relationships in `src/models/index.ts`

## 🔧 Configuration

### Environment Variables

| Variable       | Description       | Default               |
| -------------- | ----------------- | --------------------- |
| PORT           | Server port       | 5000                  |
| NODE_ENV       | Environment       | development           |
| DB_HOST        | MySQL host        | localhost             |
| DB_PORT        | MySQL port        | 3306                  |
| DB_NAME        | Database name     | medcast_db            |
| DB_USER        | Database user     | root                  |
| DB_PASSWORD    | Database password | -                     |
| JWT_SECRET     | JWT secret key    | -                     |
| JWT_EXPIRES_IN | Token expiration  | 7d                    |
| CORS_ORIGIN    | Allowed origin    | http://localhost:5173 |
| MAX_FILE_SIZE  | Max upload size   | 5242880 (5MB)         |

## 📝 Default Credentials

After first run, use these credentials to login:

- **Email**: admin@medcast.com
- **Password**: Admin@123

⚠️ **Important**: Change the password immediately after first login!

## 🚨 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error Response Format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## 📊 Database Management

### Resetting Database

```bash
# Drop all tables and recreate
mysql -u root -p medcast_db < reset.sql
npm run dev  # Will recreate tables and seed data
```

### Backup Database

```bash
mysqldump -u root -p medcast_db > backup.sql
```

## 🔄 Frontend Integration

### API Base URL

```typescript
const API_BASE_URL = "http://localhost:5000/api";
```

### Example API Call

```typescript
// Login
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const data = await response.json();
const token = data.data.token;

// Authenticated request
const hospitals = await fetch(`${API_BASE_URL}/hospitals`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## 📈 Performance Optimization

- **Compression**: Gzip compression enabled
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Database Indexing**: Optimized queries with indexes
- **Eager Loading**: Efficient data fetching with Sequelize includes
- **Pagination**: All list endpoints support pagination

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

## 🆘 Support

For issues and questions:

- Create an issue on GitHub
- Email: support@medcast.com

---

**Built with ❤️ for better healthcare management**
