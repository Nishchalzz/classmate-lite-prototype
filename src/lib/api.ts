import { supabase } from './supabase';
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((entry) => ({
      id: entry.id,
      title: entry.title,
      info: entry.info || '',
      due: entry.due,
      owner: entry.owner || '',
      team: entry.team || '',
      createdAt: entry.created_at || undefined,
    }));
  },

  // POST /addEntry - Create a new entry in Supabase
  addEntry: async (entry: Omit<Entry, 'id' | 'createdAt'>): Promise<Entry> => {
    const { data, error } = await supabase
      .from('entries')
      .insert({
        title: entry.title,
        info: entry.info,
        due: entry.due,
        owner: entry.owner,
        team: entry.team,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      title: data.title,
      info: data.info || '',
      due: data.due,
      owner: data.owner || '',
      team: data.team || '',
      createdAt: data.created_at || undefined,
    };
  },


};
