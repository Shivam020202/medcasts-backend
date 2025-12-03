# MedCast Backend - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Create MySQL Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE medcast_db;
EXIT;
```

### Step 3: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and update your MySQL password:

```env
DB_PASSWORD=your_mysql_password
```

### Step 4: Start the Server

```bash
npm run dev
```

The server will automatically:

- Create database tables
- Create an admin user
- Seed sample hospitals and specialties

### Step 5: Access Admin Panel

Open browser: http://localhost:5000/admin/admin.html

**Default Login:**

- Email: `admin@medcast.com`
- Password: `Admin@123`

## 📡 API Testing

### Quick API Tests with curl

**1. Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@medcast.com",
    "password": "Admin@123"
  }'
```

Save the token from response.

**2. Get Hospitals:**

```bash
curl http://localhost:5000/api/hospitals
```

**3. Get Hospitals (with auth):**

```bash
curl http://localhost:5000/api/hospitals \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**4. Create a Hospital:**

```bash
curl -X POST http://localhost:5000/api/hospitals \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Hospital",
    "location": "Mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "rating": 4.5,
    "specialty": "Multi-specialty hospital"
  }'
```

## 🔗 Integration with Frontend

### Install Axios in your React app:

```bash
cd ../medcast-latest
npm install axios
```

### Create API service file:

```typescript
// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const hospitalsAPI = {
  getAll: (params?: any) => api.get("/hospitals", { params }),
  getById: (id: number) => api.get(`/hospitals/${id}`),
  getBySlug: (slug: string) => api.get(`/hospitals/slug/${slug}`),
  create: (data: any) => api.post("/hospitals", data),
  update: (id: number, data: any) => api.put(`/hospitals/${id}`, data),
  delete: (id: number) => api.delete(`/hospitals/${id}`),
};

export const doctorsAPI = {
  getAll: (params?: any) => api.get("/doctors", { params }),
  getById: (id: number) => api.get(`/doctors/${id}`),
  create: (data: any) => api.post("/doctors", data),
  update: (id: number, data: any) => api.put(`/doctors/${id}`, data),
  delete: (id: number) => api.delete(`/doctors/${id}`),
};

export const specialtiesAPI = {
  getAll: (params?: any) => api.get("/specialties", { params }),
  getById: (id: number) => api.get(`/specialties/${id}`),
};

export const treatmentsAPI = {
  getAll: (params?: any) => api.get("/treatments", { params }),
  getById: (id: number) => api.get(`/treatments/${id}`),
  create: (data: any) => api.post("/treatments", data),
  update: (id: number, data: any) => api.put(`/treatments/${id}`, data),
};

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post("/auth/login", credentials),
  register: (userData: any) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
};

export default api;
```

### Use in React components:

```typescript
// Example: Fetching hospitals
import { useEffect, useState } from "react";
import { hospitalsAPI } from "../services/api";

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await hospitalsAPI.getAll({ page: 1, limit: 10 });
        setHospitals(response.data.data.hospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {hospitals.map((hospital) => (
        <div key={hospital.id}>
          <h3>{hospital.name}</h3>
          <p>{hospital.location}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📝 Common Tasks

### Add a New Hospital via API

```typescript
const newHospital = {
  name: "City Hospital",
  location: "Bangalore",
  city: "Bangalore",
  state: "Karnataka",
  country: "India",
  rating: 4.5,
  specialty: "Multi-specialty care",
  accreditation: "NABH Accredited",
};

const response = await hospitalsAPI.create(newHospital);
```

### Add a Doctor

```typescript
const newDoctor = {
  hospitalId: 1,
  specialtyId: 2,
  name: "Dr. Sarah Johnson",
  specialization: "Cardiologist",
  experience: "15+ years",
  rating: 4.8,
  qualifications: "MBBS, MD, DM Cardiology",
};

const response = await doctorsAPI.create(newDoctor);
```

### Filter Doctors by Hospital

```typescript
const doctors = await doctorsAPI.getAll({ hospitalId: 1 });
```

## 🔒 Role-Based Access

### Admin Role

- Full access to all resources
- Can create/edit/delete hospitals, specialties, users

### Hospital Manager Role

- Manage doctors and treatments for their hospital
- Cannot create/edit hospitals or specialties

### Create Hospital Manager User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manager@apollo.com",
    "password": "SecurePass123",
    "name": "Apollo Manager",
    "role": "hospital_manager",
    "hospitalId": 3
  }'
```

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

- Check MySQL is running: `mysql -u root -p`
- Verify DB credentials in `.env` file
- Ensure database exists: `CREATE DATABASE medcast_db;`

### Error: "Port 5000 already in use"

- Change PORT in `.env` file
- Or kill process: `npx kill-port 5000`

### Error: "Authentication failed"

- Token expired - login again
- Check Authorization header format: `Bearer token`

## 📚 Next Steps

1. ✅ Backend is running
2. ✅ Test APIs with Postman or curl
3. 🔄 Integrate with React frontend
4. 🎨 Customize CMS admin panel
5. 🚀 Deploy to production

## 🌐 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
DB_HOST=your-production-db-host
DB_PASSWORD=strong-production-password
JWT_SECRET=very-secure-random-string-here
CORS_ORIGIN=https://your-frontend-domain.com
```

### Build and Run

```bash
npm run build
npm start
```

## 📞 Support

If you encounter issues:

1. Check the README.md for detailed documentation
2. Review error messages in console
3. Verify all environment variables are set correctly

Happy coding! 🎉
