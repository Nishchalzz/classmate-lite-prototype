import { supabase } from '@/integrations/supabase/client';

export interface Entry {
  id?: string;
  title: string;
  info: string;
  due: string;
  owner: string;
  team: string;
  createdAt?: string;
}

export const api = {
  // GET /entries - Fetch all entries from Supabase
  getEntries: async (): Promise<Entry[]> => {
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
