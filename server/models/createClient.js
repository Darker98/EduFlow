import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.CONNECTION_URL;
const supabaseKey = process.env.CONNECTION_STRING;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;