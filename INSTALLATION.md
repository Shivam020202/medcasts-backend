# MedCast Healthcare Platform - Complete Backend System

## 🎉 What Has Been Created

A complete, production-ready backend system for your MedCast healthcare website with:

### ✅ Core Features Implemented

1. **RESTful API** with Express.js & TypeScript
2. **MySQL Database** with Sequelize ORM
3. **JWT Authentication** with role-based access control
4. **File Upload System** for images
5. **Admin CMS Interface** (basic HTML/JS version)
6. **Comprehensive Documentation**

### 📊 Database Models

- **Users** - Admin, Hospital Managers, Doctors with authentication
- **Hospitals** - Complete hospital profiles with ratings, images, locations
- **Doctors** - Doctor profiles with specializations, expertise, ratings
- **Specialties** - Medical specialties (Cardiology, Oncology, etc.)
- **Treatments** - Medical procedures with costs, durations
- **Testimonials** - Patient reviews with approval workflow

### 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based authorization (Admin, Hospital Manager, Doctor)
- Rate limiting (100 req/15min per IP)
- CORS protection
- Helmet security headers
- SQL injection protection via ORM

### 📁 Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration & database setup
│   ├── models/              # Sequelize models (6 models)
│   ├── controllers/         # Business logic (6 controllers)
│   ├── routes/              # API routes (6 route files)
│   ├── middleware/          # Auth, upload, error handling
│   ├── utils/               # Helper functions
│   └── server.ts            # Main application
├── public/
│   └── admin.html           # Basic CMS interface
├── uploads/                 # File upload directory
├── .env.example             # Environment template
├── package.json
├── tsconfig.json
├── README.md                # Full documentation
└── QUICKSTART.md            # Quick setup guide
```

## 🚀 Installation Instructions

### Prerequisites

- Node.js v16+
- MySQL 8.0+
- npm or yarn

### Step-by-Step Setup

**1. Navigate to backend folder:**

```powershell
cd a:\Work\medcasts-main\backend
```

**2. Install dependencies:**

```powershell
npm install
```

**3. Create MySQL database:**

```powershell
mysql -u root -p
```

Then in MySQL:

```sql
CREATE DATABASE medcast_db;
EXIT;
```

**4. Configure environment:**

```powershell
Copy-Item .env.example .env
```

Edit `.env` file and update:

```env
DB_PASSWORD=your_mysql_password
```

**5. Start the server:**

```powershell
npm run dev
```

The server will:

- ✅ Create all database tables automatically
- ✅ Create default admin user (admin@medcast.com / Admin@123)
- ✅ Seed sample hospitals and specialties
- ✅ Start on http://localhost:5000

### Access Points

**API Endpoints:**

- Base URL: http://localhost:5000/api
- Health Check: http://localhost:5000/health

**Admin Panel:**

- URL: http://localhost:5000/admin/admin.html
- Login: admin@medcast.com / Admin@123

## 📡 API Usage Examples

### Authentication

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@medcast.com","password":"Admin@123"}'
```

### Get Hospitals

```bash
curl http://localhost:5000/api/hospitals
```

### Create Hospital (requires auth)

```bash
curl -X POST http://localhost:5000/api/hospitals \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Hospital",
    "location": "Delhi",
    "city": "Delhi",
    "state": "Delhi",
    "rating": 4.5,
    "specialty": "Multi-specialty"
  }'
```

## 🔗 Frontend Integration

### Install axios in your React app:

```bash
cd ../medcast-latest
npm install axios
```

### Create API service:

```typescript
// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getHospitals = () => API.get("/hospitals");
export const getHospitalBySlug = (slug: string) =>
  API.get(`/hospitals/slug/${slug}`);
export const getDoctors = (params?: any) => API.get("/doctors", { params });
export const getSpecialties = () => API.get("/specialties");
```

### Use in components:

```typescript
import { useEffect, useState } from "react";
import { getHospitals } from "./services/api";

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getHospitals()
      .then((res) => setHospitals(res.data.data.hospitals))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {hospitals.map((h) => (
        <div key={h.id}>
          {h.name} - {h.location}
        </div>
      ))}
    </div>
  );
}
```

## 📋 Available Endpoints

### Public Endpoints (No Auth Required)

- `GET /api/hospitals` - List all hospitals
- `GET /api/hospitals/:id` - Get hospital by ID
- `GET /api/hospitals/slug/:slug` - Get hospital by slug
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/specialties` - List all specialties
- `GET /api/treatments` - List all treatments
- `GET /api/testimonials` - List approved testimonials

### Protected Endpoints (Auth Required)

**Admin Only:**

- `POST /api/hospitals` - Create hospital
- `PUT /api/hospitals/:id` - Update hospital
- `DELETE /api/hospitals/:id` - Delete hospital
- `POST /api/specialties` - Create specialty
- `PATCH /api/testimonials/:id/approve` - Approve testimonial

**Admin & Hospital Manager:**

- `POST /api/doctors` - Add doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Remove doctor
- `POST /api/treatments` - Add treatment
- `PUT /api/treatments/:id` - Update treatment

## 🎨 CMS Features

The basic CMS admin panel includes:

1. **Dashboard Overview**

   - Total hospitals, doctors, treatments
   - Pending testimonials count

2. **Hospital Management**

   - View all hospitals
   - Add/Edit/Delete hospitals
   - Upload hospital images

3. **Doctor Management**

   - Manage doctor profiles
   - Assign to hospitals and specialties

4. **Treatment Management**

   - Add medical procedures
   - Set costs and durations

5. **Testimonial Approval**
   - Review patient testimonials
   - Approve/reject reviews

## 🔄 Migration Path for Your Static Site

### Current State → Dynamic Backend

**Before (Static):**

```typescript
// Hardcoded in constants.ts
export const bestHospitalsIndia = [
  { name: 'Artemis', location: 'Gurgaon', ... }
];
```

**After (Dynamic with API):**

```typescript
// Fetch from backend
const [hospitals, setHospitals] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/hospitals")
    .then((res) => res.json())
    .then((data) => setHospitals(data.data.hospitals));
}, []);
```

### Converting Static Pages to Dynamic

**Example: Convert hospital-specific pages**

Instead of separate files:

- `artemis-bmt.tsx`
- `apollo-bmt.tsx`
- `medanta-bmt.tsx`

Create one dynamic page:

```typescript
// pages/hospital-service.tsx
function HospitalServicePage() {
  const { hospitalSlug, specialty } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/hospitals/slug/${hospitalSlug}`)
      .then((res) => res.json())
      .then((result) => setData(result.data));
  }, [hospitalSlug]);

  // Render hospital data dynamically
}
```

## 📦 What's Included

### Backend Files (Complete)

- ✅ Express.js server with TypeScript
- ✅ 6 database models with relationships
- ✅ 6 controllers with full CRUD
- ✅ Authentication & authorization
- ✅ File upload system
- ✅ Error handling middleware
- ✅ Database initialization & seeding
- ✅ Basic admin CMS interface

### Documentation

- ✅ README.md - Complete API documentation
- ✅ QUICKSTART.md - Quick setup guide
- ✅ INSTALLATION.md - This file
- ✅ Code comments throughout

### Configuration

- ✅ TypeScript configuration
- ✅ Environment variables setup
- ✅ Security middleware
- ✅ CORS configuration
- ✅ Rate limiting

## 🎯 Next Steps

1. **Start the backend:**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Test the API:**

   - Visit http://localhost:5000/health
   - Try the admin panel at http://localhost:5000/admin/admin.html

3. **Integrate with frontend:**

   - Install axios in your React app
   - Replace static data with API calls
   - Use dynamic routing instead of static pages

4. **Customize:**
   - Add more fields to models as needed
   - Extend the admin panel
   - Add email notifications
   - Implement search functionality

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```powershell
# Change PORT in .env or kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Database connection error:**

- Ensure MySQL is running
- Check credentials in .env
- Verify database exists

**TypeScript errors:**

- Run `npm install` to install all dependencies
- Errors about missing packages are expected until npm install runs

## 📞 Support & Documentation

- **Full API Docs:** See `README.md`
- **Quick Start:** See `QUICKSTART.md`
- **Issues:** Check error messages in terminal

## 🎉 Summary

You now have a complete, professional backend system for your healthcare platform with:

- ✅ Secure RESTful API
- ✅ MySQL database with proper relationships
- ✅ Role-based access control
- ✅ File upload capabilities
- ✅ Admin CMS interface
- ✅ Comprehensive documentation

The backend is ready to replace your static data and make your entire website dynamic and manageable through the CMS!

**Time to get started:** 5-10 minutes ⏱️
**Next:** Run `npm install` and `npm run dev` in the backend folder!
