// API service - Replace these endpoints with your Firebase/Supabase URLs
const API_BASE_URL = '/api'; // Change this to your backend URL

export interface Entry {
  id?: string;
  title: string;
  info: string;
  due: string;
  owner: string;
  team: string;
  createdAt?: string;
}

// Mock data for development (remove when connecting to real backend)
let mockEntries: Entry[] = [
  {
    id: '1',
    title: 'Group Project Milestone 1',
    info: 'Complete the research phase and submit preliminary findings',
    due: '2024-12-15',
    owner: 'Alex Chen',
    team: 'CS301-TeamA',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Literature Review Draft',
    info: 'Draft the literature review section for the thesis',
    due: '2024-12-20',
    owner: 'Jordan Smith',
    team: 'Thesis-Group',
    createdAt: new Date().toISOString()
  }
];

export const api = {
  // GET /entries - Fetch all entries
  getEntries: async (): Promise<Entry[]> => {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/entries`);
    // return response.json();
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockEntries]), 500);
    });
  },

  // POST /addEntry - Create a new entry
  addEntry: async (entry: Omit<Entry, 'id' | 'createdAt'>): Promise<Entry> => {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/addEntry`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(entry)
    // });
    // return response.json();
    
    // Mock implementation
    return new Promise((resolve) => {
      const newEntry: Entry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      mockEntries.unshift(newEntry);
      setTimeout(() => resolve(newEntry), 500);
    });
  }
};
