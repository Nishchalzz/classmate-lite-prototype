# Setting Up Supabase Database

## Step 1: Create the Database Table

1. Go to your Supabase project dashboard: https://app.supabase.com/project/qxlowoxttohmwirwhxgth
2. Click on the **SQL Editor** tab in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase-setup.sql` file
5. Click **Run** to execute the SQL

The table structure:
- `id` - UUID (auto-generated)
- `title` - Text (required)
- `info` - Text (optional)
- `due` - Date (required)
- `owner` - Text (optional)
- `team` - Text (optional)
- `created_at` - Timestamp (auto-generated)

## Step 2: Test the Integration

1. Make sure the dev server is running: `npm run dev`
2. Open http://localhost:8080/
3. Navigate to "Create Entry"
4. Fill out the form and submit
5. Navigate to "View Entries" to see your saved entry

## Step 3: Verify in Supabase

1. Go to the **Table Editor** tab in Supabase
2. Select the `entries` table
3. You should see your newly created entries

## Troubleshooting

If you get errors:
- Check browser console (F12) for error messages
- Verify the table was created in Supabase
- Ensure your `.env` file has the correct credentials
- Make sure Row Level Security policies are set up correctly
