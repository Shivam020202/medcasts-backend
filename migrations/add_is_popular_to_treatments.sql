-- Migration: Add isPopular column to treatments table
-- Date: 2025-01-21

-- Add isPopular column
ALTER TABLE treatments ADD COLUMN is_popular BOOLEAN NOT NULL DEFAULT 0;

-- Add index for better query performance
CREATE INDEX idx_treatments_is_popular ON treatments(is_popular);

-- Optional: Mark some existing treatments as popular (you can customize this)
-- UPDATE treatments SET is_popular = 1 WHERE id IN (1, 2, 3) AND is_active = 1;
