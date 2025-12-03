# Database Migration Notes

## Recent Changes

### Treatment Model - Added `isPopular` Field (Nov 24, 2025)

**Changes Made:**

- Added `isPopular` boolean field to Treatment model
- Default value: `false`
- Indexed for performance
- Maximum 3 treatments can be marked as popular at a time

**New API Endpoints:**

- `GET /api/treatments/popular` - Get popular treatments (public)
- `PATCH /api/treatments/:id/toggle-popular` - Toggle popular status (admin only)

**Database Schema Update:**
The following column will be automatically added when you restart the server:

```sql
ALTER TABLE treatments ADD COLUMN is_popular TINYINT(1) NOT NULL DEFAULT 0;
CREATE INDEX treatments_is_popular ON treatments (is_popular);
```

**Usage:**

```bash
# Get popular treatments
curl http://localhost:5000/api/treatments/popular

# Mark treatment as popular (requires admin token)
curl -X PATCH http://localhost:5000/api/treatments/1/toggle-popular \
  -H "Authorization: Bearer YOUR_TOKEN"

# Unmark treatment from popular (same endpoint, toggles)
curl -X PATCH http://localhost:5000/api/treatments/1/toggle-popular \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Business Rules:**

- Only 3 treatments can be popular at the same time
- Only active treatments count toward the 3-treatment limit
- Admin role required to toggle popular status
- Attempting to mark a 4th treatment as popular will return an error

**No Manual Migration Required:**
Since you're using Sequelize with `sync()` in development mode, the column will be automatically added when you restart the server. The existing treatments will have `isPopular = false` by default.

## Restart Required

After pulling these changes, restart your server:

```bash
cd backend
npm run dev
```

The database schema will be automatically updated on startup.
