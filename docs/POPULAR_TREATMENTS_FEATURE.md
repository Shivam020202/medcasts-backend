# Popular Treatments Feature

## Overview
This feature allows administrators to mark up to 3 treatments as "popular" which will be displayed on the homepage in the PopularProcedures component. The treatments are grouped by specialty and displayed in tabs.

## Backend Changes

### Database Schema
- Added `is_popular` column to the `treatments` table (BOOLEAN, default: false)
- Added index on `is_popular` for better query performance

### API Endpoints

#### Get Popular Treatments
```
GET /api/treatments/popular
```
Returns up to 3 treatments marked as popular, including their associated hospital and specialty information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "CABG Surgery",
      "cost": "$5,000 - $8,000",
      "description": "Coronary Artery Bypass Graft surgery",
      "duration": "3-4 hours",
      "stay": "5-7 days",
      "successRate": 95.5,
      "isPopular": true,
      "specialty": {
        "id": 1,
        "name": "Cardiac Surgery",
        "slug": "cardiac-surgery"
      },
      "hospital": {
        "id": 1,
        "name": "Artemis Hospital",
        "location": "Gurugram"
      }
    }
  ]
}
```

#### Toggle Popular Status (Admin Only)
```
PATCH /api/treatments/:id/toggle-popular
Authorization: Bearer <admin_token>
```
Toggles the popular status of a treatment. Maximum of 3 treatments can be marked as popular at once.

**Response:**
```json
{
  "success": true,
  "message": "Treatment marked as popular successfully",
  "data": {
    "id": 1,
    "name": "CABG Surgery",
    "isPopular": true,
    ...
  }
}
```

**Error Response (when limit exceeded):**
```json
{
  "success": false,
  "message": "Maximum of 3 treatments can be marked as popular. Please unmark another treatment first."
}
```

## Frontend Changes

### PopularProcedures Component
The component has been refactored to:
1. Fetch popular treatments from the API
2. Group treatments by specialty
3. Display specialty tabs (only specialties with popular treatments)
4. Show treatments under each specialty tab
5. Display treatment details including cost, duration, stay, success rate, and hospital information

### Features
- **Dynamic Data**: Fetches data from the backend API
- **Specialty Tabs**: Automatically creates tabs based on specialties of popular treatments
- **Responsive Design**: Works on desktop and mobile devices
- **Loading State**: Shows skeleton loader while fetching data
- **Empty State**: Hides component if no popular treatments are available

## Usage

### For Administrators

1. **Mark a treatment as popular:**
   ```bash
   curl -X PATCH http://localhost:5000/api/treatments/1/toggle-popular \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

2. **Unmark a treatment:**
   ```bash
   curl -X PATCH http://localhost:5000/api/treatments/1/toggle-popular \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

3. **View popular treatments:**
   ```bash
   curl http://localhost:5000/api/treatments/popular
   ```

### Database Migration

Run the migration to add the `is_popular` column:

```bash
# Using SQLite
sqlite3 database.sqlite < migrations/add_is_popular_to_treatments.sql

# Or manually in your database client
ALTER TABLE treatments ADD COLUMN is_popular BOOLEAN NOT NULL DEFAULT 0;
CREATE INDEX idx_treatments_is_popular ON treatments(is_popular);
```

## Testing

1. Create some treatments with different specialties
2. Mark 3 treatments as popular using the API
3. Visit the homepage to see the PopularProcedures component
4. Try to mark a 4th treatment as popular (should fail with error message)
5. Unmark one treatment and mark another

## Notes

- Maximum of 3 treatments can be marked as popular at any time
- Only active treatments can be displayed as popular
- Treatments are grouped by specialty in the frontend
- The component will not render if there are no popular treatments
- Only admins can toggle the popular status of treatments
