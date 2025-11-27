import { AlertCircle, Database, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DatabaseSetup = () => {
  const sqlCode = `-- Create the entries table in Supabase
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

-- Create a policy that allows all operations
CREATE POLICY "Allow all access to entries" ON entries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS entries_created_at_idx ON entries(created_at DESC);
CREATE INDEX IF NOT EXISTS entries_due_idx ON entries(due);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Database Not Set Up</AlertTitle>
        <AlertDescription>
          The entries table doesn't exist in your Supabase database yet. Follow the steps below to set it up.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Setup Instructions
          </CardTitle>
          <CardDescription>
            Complete these steps to enable database functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium">Open Supabase SQL Editor</p>
                <p className="text-sm text-muted-foreground">
                  Click the button below to open your project's SQL editor
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open('https://app.supabase.com/project/qxlowoxttohmwirwhxgth/sql/new', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open SQL Editor
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium">Copy and paste this SQL</p>
                <div className="mt-2 relative">
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{sqlCode}</code>
                  </pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    Copy SQL
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium">Run the query</p>
                <p className="text-sm text-muted-foreground">
                  Click the "Run" button in the SQL Editor to create the table
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                4
              </div>
              <div className="flex-1">
                <p className="font-medium">Refresh this page</p>
                <p className="text-sm text-muted-foreground">
                  After running the SQL, refresh this page to start using the app
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSetup;
