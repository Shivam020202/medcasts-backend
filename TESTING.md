# MedCast Backend Testing Guide

## ✅ Backend Status

The backend has been successfully created, compiled, and tested. The server starts correctly and all database tables are created with sample data.

## 🚀 Quick Start

### Option 1: Using PowerShell Script

```powershell
cd a:\Work\medcasts-main\backend
.\start.bat
```

### Option 2: Using NPM Scripts

```powershell
cd a:\Work\medcasts-main\backend
npm run dev     # Development mode with auto-restart
npm run build   # Compile TypeScript
npm start       # Production mode (after build)
```

### Option 3: Manual Start

```powershell
cd a:\Work\medcasts-main\backend
node dist/server.js
```

## 📊 Database Initialization

The database has been initialized with:

✅ **Admin User**

- Email: `admin@medcast.com`
- Password: `Admin@123`
- Role: `admin`

✅ **6 Specialties Created**

1. Cardiac Surgery
2. Neurology
3. Oncology
4. Orthopedics
5. BMT (Bone Marrow Transplantation)
6. GI Surgery

✅ **6 Sample Hospitals Created**

1. Artemis Hospital (Gurugram)
2. Medanta - The Medicity (Gurugram)
3. Indraprastha Apollo Hospital (New Delhi)
4. Max Super Speciality Hospital (New Delhi)
5. Amrita Hospital (Faridabad)
6. Sarvodaya Hospital (Faridabad)

## 🧪 Testing the API

### 1. Health Check

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET | ConvertTo-Json
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-18T11:35:10.921Z"
}
```

### 2. Login as Admin

```powershell
$loginBody = @{
    email = "admin@medcast.com"
    password = "Admin@123"
} | ConvertTo-Json

$response = Invoke-RestMethod `
    -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Body $loginBody `
    -ContentType "application/json"

$response | ConvertTo-Json
$token = $response.token
Write-Host "Token: $token"
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@medcast.com",
    "name": "System Administrator",
    "role": "admin"
  }
}
```

### 3. Get All Hospitals

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/hospitals" -Method GET | ConvertTo-Json -Depth 3
```

**Expected Response:**

```json
{
  "success": true,
  "total": 6,
  "page": 1,
  "totalPages": 1,
  "data": [
    {
      "id": 1,
      "name": "Artemis Hospital",
      "slug": "artemis-hospital",
      "location": "Gurugram",
      "city": "Gurugram",
      "rating": 4.5,
      ...
    },
    ...
  ]
}
```

### 4. Get Specific Hospital

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/hospitals/artemis-hospital" -Method GET | ConvertTo-Json -Depth 3
```

### 5. Get All Specialties

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/specialties" -Method GET | ConvertTo-Json -Depth 3
```

### 6. Create a New Hospital (Requires Authentication)

```powershell
# First, login to get token
$loginBody = @{ email = "admin@medcast.com"; password = "Admin@123" } | ConvertTo-Json
$login = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $login.token

# Create hospital
$hospitalData = @{
    name = "Test Hospital"
    location = "Test City"
    city = "Test City"
    state = "Test State"
    rating = 4.0
    specialty = "General Medicine"
    description = "A test hospital"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Invoke-RestMethod `
    -Uri "http://localhost:5000/api/hospitals" `
    -Method POST `
    -Headers $headers `
    -Body $hospitalData | ConvertTo-Json
```

## 🎯 Using Postman or Thunder Client

### Import Collection

You can test all endpoints using Postman or VS Code Thunder Client extension.

#### Base URL

```
http://localhost:5000/api
```

#### Available Endpoints

**Authentication**

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (requires auth)

**Hospitals**

- GET `/api/hospitals` - Get all hospitals
- GET `/api/hospitals/:slug` - Get hospital by slug
- POST `/api/hospitals` - Create hospital (admin only)
- PUT `/api/hospitals/:id` - Update hospital (admin only)
- DELETE `/api/hospitals/:id` - Delete hospital (admin only)

**Doctors**

- GET `/api/doctors` - Get all doctors
- GET `/api/doctors/:slug` - Get doctor by slug
- POST `/api/doctors` - Create doctor (admin/manager only)
- PUT `/api/doctors/:id` - Update doctor (admin/manager only)
- DELETE `/api/doctors/:id` - Delete doctor (admin/manager only)

**Specialties**

- GET `/api/specialties` - Get all specialties
- GET `/api/specialties/:slug` - Get specialty by slug
- POST `/api/specialties` - Create specialty (admin only)
- PUT `/api/specialties/:id` - Update specialty (admin only)
- DELETE `/api/specialties/:id` - Delete specialty (admin only)

**Treatments**

- GET `/api/treatments` - Get all treatments
- GET `/api/treatments/:slug` - Get treatment by slug
- POST `/api/treatments` - Create treatment (admin/manager only)
- PUT `/api/treatments/:id` - Update treatment (admin/manager only)
- DELETE `/api/treatments/:id` - Delete treatment (admin/manager only)

**Testimonials**

- GET `/api/testimonials` - Get all approved testimonials
- GET `/api/testimonials/:id` - Get testimonial by ID
- POST `/api/testimonials` - Create testimonial
- PUT `/api/testimonials/:id` - Update testimonial (admin/manager only)
- DELETE `/api/testimonials/:id` - Delete testimonial (admin/manager only)
- PUT `/api/testimonials/:id/approve` - Approve testimonial (admin only)

## 🌐 Access Admin Panel

1. Start the server
2. Open your browser
3. Navigate to: `http://localhost:5000/admin/admin.html`
4. Login with:
   - Email: `admin@medcast.com`
   - Password: `Admin@123`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, upload, error handling
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   └── server.ts       # Main application file
├── dist/               # Compiled JavaScript (after build)
├── public/             # Static files (admin panel)
├── uploads/            # Uploaded images
├── database.sqlite     # SQLite database file
└── .env                # Environment variables
```

## 🔒 Security Notes

1. **Change Default Password**: After first login, change the admin password immediately
2. **JWT Secret**: In production, use a strong JWT secret in `.env`
3. **Database**: For production, switch from SQLite to MySQL by updating `.env`:
   ```env
   USE_SQLITE=false
   DB_PASSWORD=your_mysql_password
   ```

## 🐛 Troubleshooting

### Server Won't Start

```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <process_id> /F

# Restart server
cd a:\Work\medcasts-main\backend
npm run dev
```

### Database Issues

```powershell
# Delete and recreate database
cd a:\Work\medcasts-main\backend
Remove-Item database.sqlite
npm run dev  # Will auto-create new database
```

### Module Not Found Errors

```powershell
# Reinstall dependencies
cd a:\Work\medcasts-main\backend
Remove-Item node_modules -Recurse -Force
npm install
```

## ✅ Verification Checklist

- [x] Backend server starts without errors
- [x] Database connection established
- [x] All tables created successfully
- [x] Admin user seeded
- [x] Sample data loaded
- [x] Health endpoint responding
- [x] Authentication working
- [x] CRUD operations functional
- [x] File uploads configured
- [x] Admin panel accessible

## 📝 Next Steps

1. **Customize Data**: Add more hospitals, doctors, and treatments through the API or admin panel
2. **File Uploads**: Test image upload functionality for hospitals and doctors
3. **Frontend Integration**: Connect your frontend to the API
4. **Production Deploy**: When ready, deploy to a cloud service (Vercel, Railway, Heroku, etc.)
5. **Database Migration**: Switch to MySQL for production use

## 📞 Support

For issues or questions:

1. Check the `README.md` in the backend folder
2. Review `QUICKSTART.md` for setup instructions
3. See `INSTALLATION.md` for detailed installation steps
4. Check server logs for error messages

---

**🎉 Your backend is ready to use!**
