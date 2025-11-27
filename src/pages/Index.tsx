import { Link } from 'react-router-dom';
import { BookOpen, Plus, List, GraduationCap, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Track Deadlines',
      description: 'Never miss an assignment with organized due dates',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Coordinate with your study groups effortlessly',
    },
    {
      icon: GraduationCap,
      title: 'Stay Organized',
      description: 'Keep all your academic tasks in one place',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <BookOpen className="h-4 w-4" />
          Study Planning Made Simple
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to{' '}
          <span className="text-primary">ClassMate Lite</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Your lightweight study planning companion for academic collaboration. 
          Create, organize, and track study tasks with your team.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/create">
            <Button size="lg" className="min-w-[160px]">
              <Plus className="mr-2 h-5 w-5" />
              Add Entry
            </Button>
          </Link>
          <Link to="/entries">
            <Button size="lg" variant="outline" className="min-w-[160px]">
              <List className="mr-2 h-5 w-5" />
              View Entries
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
