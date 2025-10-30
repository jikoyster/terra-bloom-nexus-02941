// src/controllers/userController.ts

import { supabase } from '../supabaseClient'; // Adjusted import

export const countFarmers = async (req, res) => {
  try {
    // Supabase query to count rows in the 'users' table where 'role' is 2.
    // NOTE: 'users' is the assumed table name where the 'role' column exists.
    const { count, error } = await supabase
      .from('Users') 
      .select('*', { count: 'exact', head: true }) // <--- Fetches the count without returning rows
      .eq('role', 2);                             // <--- Filters by the role

    if (error) {
      console.error('Supabase Query Error:', error);
      // Propagate the error so the client gets a 500 status
      throw new Error(error.message); 
    }
    
    // The count is returned directly in the response object from Supabase
    res.json({ totalFarmers: count });

  } catch (error) {
    console.error('Controller Execution Error:', error);
res.status(500).json({ error: 'Failed to count farmers' });
  }
}