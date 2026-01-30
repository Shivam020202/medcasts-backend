# Database Setup Instructions for MedCasts Production

## Summary
Your server team confirmed that the Node.js application is running correctly. The only issue is **missing database tables** in the `medcasts_db` database.

## What's Working ✅
- ✅ Node.js application starts successfully
- ✅ Passenger is configured correctly  
- ✅ MySQL database connection established
- ✅ dist/server.js compiles and runs
- ✅ API endpoints are accessible

## What's Missing ❌
- ❌ Database tables (hospitals, specialties, doctors, treatments, etc.)
- ❌ This is causing "Table doesn't exist" errors on all API endpoints

## Solution: Create Database Tables & Seed Data

### Step 1: Access cPanel phpMyAdmin
1. Log into your cPanel at your hosting provider
2. Find and click **phpMyAdmin** icon
3. Select database: `medcasts_db` from the left sidebar

### Step 2: Execute SQL Schema
1. Click the **SQL** tab at the top
2. Open the file: `backend/database-schema.sql`
3. Copy ALL contents of that file
4. Paste into the SQL query box in phpMyAdmin
5. Click **Go** button to execute

### Step 3: Verify Tables Created
After execution, you should see these 7 tables in the left sidebar:
- ✓ hospitals (with 5 sample hospitals)
- ✓ users (with admin user)
- ✓ specialties (with 6 sample specialties)
- ✓ doctors (with 6 sample doctors)
- ✓ treatments (with 6 sample treatments)
- ✓ testimonials (with 4 sample testimonials)
- ✓ hospital_specialties

### Step 4: Restart Node.js Application
1. In cPanel, go to **Setup Node.js App**
2. Find your `node.medcasts.com` application
3. Click **Stop App**
4. Wait 5 seconds
5. Click **Start App**

### Step 5: Test Your API
Visit these URLs in your browser:
- https://node.medcasts.com/api/hospitals (should return JSON data with Apollo, Medanta, etc.)
- https://node.medcasts.com/api/specialties (should return JSON data with Cardiology, Oncology, etc.)
- https://staging.medcasts.com (frontend should load with real data)

## Expected Results After Setup

### ✅ Success Indicators:
- API endpoints return actual data (not empty arrays)
- Frontend loads without 503 errors  
- Admin panel accessible at https://node.medcasts.com/admin
- You can log in with: admin@medcast.com / Admin@123

### ❌ If You Still See Errors:
Check the application logs in cPanel for:
- Database connection errors
- Table permission issues
- Foreign key constraint errors

## Next Steps After Database Setup

1. **Test Frontend**: Visit https://staging.medcasts.com and verify:
   - Home page loads with hospital cards
   - Search functionality works
   - Doctor profiles are visible

2. **Production Deployment**: Your application is now ready for production use!

## Files Reference

- **Database Schema**: `backend/database-schema.sql` (execute this in phpMyAdmin)
- **Production .env**: Already uploaded to server with correct MySQL credentials
- **Backend Build**: `backend/dist/` folder already deployed to server

## Support

If you encounter any issues:
1. Check cPanel Application Manager logs
2. Verify `.env` file on server has correct credentials
3. Ensure `medcasts_db` database exists and user has full permissions
4. Contact your server team if database permission errors occur

---

**Last Updated**: December 3, 2025  
**Status**: Ready for database setup in phpMyAdmin
