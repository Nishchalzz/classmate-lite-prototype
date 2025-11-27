import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import CreateEntry from "./pages/CreateEntry";
import ViewEntries from "./pages/ViewEntries";
import NotFound from "./pages/NotFound";
import DatabaseSetup from "./pages/DatabaseSetup";
import { supabase } from "./lib/supabase";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Test Supabase connection
const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...');
  try {
    // Try to fetch from entries table
    const { data, error } = await supabase.from('entries').select('count').limit(1);
    if (error) {
      console.error('❌ Supabase connection error:', error.message);
      console.log('💡 Please run the SQL in supabase-setup.sql file to create the entries table');
    } else {
      console.log('✅ Supabase connected successfully!');
      console.log('📊 Database is ready to use');
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
};

const App = () => {
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create" element={<CreateEntry />} />
              <Route path="/entries" element={<ViewEntries />} />
              <Route path="/setup" element={<DatabaseSetup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
