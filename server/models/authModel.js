import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.CONNECTION_URL;
const supabaseKey = process.env.CONNECTION_STRING;

// Throw error if .env not configured properly
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key must be defined in the .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const login = async (credentials) => {
    const { email, password } = credentials;

    // Sign in using email and password
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })

    if (error) throw new Error(error.message);
    
    // Retrieve and return the user ID
    const userId = data.user?.id; // Check if `user` exists
    if (!userId) throw new Error("User ID could not be retrieved");
    return { userId };
}

export const signup = async (credentials) => {
    const { email, password } = credentials;

    // Signup using email and password
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      })

    if (error) throw new Error(error.message);
    return data;
}


// Example usage
// const credentials = { email: "someone@example.com", password: "pass123" };

// login(credentials)
//     .then((data) => console.log("Signup successful:", data))
//     .catch((error) => console.error("Error during signup:", error.message));