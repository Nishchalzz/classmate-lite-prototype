import { supabase } from './supabase';

export interface Entry {
  id?: string;
  title: string;
  info: string;
  due: string;
  owner: string;
  team: string;
  created_at?: string;
}

export const api = {
  // GET /entries - Fetch all entries from Supabase
  getEntries: async (): Promise<Entry[]> => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching entries:', error);
        
        // Check if table doesn't exist
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          console.error('⚠️ The "entries" table does not exist in Supabase.');
          console.log('📋 Please run the SQL from supabase-setup.sql in your Supabase SQL Editor');
        }
        
        throw new Error(`Database Error: ${error.message}`);
      }

      console.log('✅ Fetched entries successfully:', data?.length || 0, 'entries');
      return data || [];
    } catch (err) {
      console.error('❌ Failed to fetch entries:', err);
      throw err;
    }
  },

  // POST /addEntry - Create a new entry in Supabase
  addEntry: async (entry: Omit<Entry, 'id' | 'created_at'>): Promise<Entry> => {
    try {
      console.log('📝 Creating entry:', entry);
      
      const { data, error } = await supabase
        .from('entries')
        .insert([entry])
        .select()
        .single();

      if (error) {
        console.error('❌ Error adding entry:', error);
        
        // Check if table doesn't exist
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          console.error('⚠️ The "entries" table does not exist in Supabase.');
          console.log('📋 Please run the SQL from supabase-setup.sql in your Supabase SQL Editor');
        }
        
        throw new Error(`Database Error: ${error.message}`);
      }

      console.log('✅ Entry created successfully:', data);
      return data;
    } catch (err) {
      console.error('❌ Failed to add entry:', err);
      throw err;
    }
  }
};
