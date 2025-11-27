-- Create the entries table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  info TEXT DEFAULT '',
  due DATE NOT NULL,
  owner TEXT DEFAULT '',
  team TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- You can modify this later to add authentication
CREATE POLICY "Allow all access to entries" ON entries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS entries_created_at_idx ON entries(created_at DESC);
CREATE INDEX IF NOT EXISTS entries_due_idx ON entries(due);
