import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Calendar, User, Users, Plus, Loader2, FileText } from 'lucide-react';
import { api, Entry } from '@/lib/api';
import { Button } from '@/components/ui/button';

const ViewEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getEntries();
      setEntries(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to fetch entries:', err);
      
      if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
        setError('Database table not set up. Please check browser console (F12) and run the SQL from supabase-setup.sql file.');
      } else {
        setError(`Failed to load entries: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading entries...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-destructive mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            {error.includes('Database table not set up') && (
              <Link to="/setup">
                <Button variant="default">
                  Setup Database
                </Button>
              </Link>
            )}
            <Button onClick={fetchEntries} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Study Entries</h1>
          <p className="mt-2 text-muted-foreground">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in your planner
          </p>
        </div>
        <Link to="/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-medium text-foreground">No entries yet</h3>
          <p className="mt-1 text-muted-foreground">Create your first study entry to get started.</p>
          <Link to="/create" className="mt-4">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Entry
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-card-foreground">
                    {entry.title}
                  </h2>
                  {entry.info && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {entry.info}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(parseISO(entry.due), 'MMM d, yyyy')}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                {entry.owner && (
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>{entry.owner}</span>
                  </div>
                )}
                {entry.team && (
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{entry.team}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default ViewEntries;
