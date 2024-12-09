import { createClient } from '@supabase/supabase-js';
import { createProfile, updateProfile, getProfile, deleteProfile } from './profileModel.js'
import { login, signup } from './'
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.CONNECTION_URL;
const supabaseKey = process.env.CONNECTION_STRING;
const supabase = createClient(supabaseUrl, supabaseKey);

